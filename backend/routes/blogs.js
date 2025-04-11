const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const { protect } = require('../middleware/auth');

// @route   GET /api/blogs
// @desc    Get all blogs with pagination
// @access  Public
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('author', 'name email');
    
    const total = await Blog.countDocuments();
    
    res.json({
      blogs,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/blogs/:id
// @desc    Get blog by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'name email');
    
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    
    res.json(blog);
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/blogs
// @desc    Create a blog
// @access  Private
router.post('/', protect, async (req, res) => {
  const { title, content } = req.body;
  
  try {
    const newBlog = new Blog({
      title,
      content,
      author: req.user.id
    });
    
    const blog = await newBlog.save();
    
    res.status(201).json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   PUT /api/blogs/:id
// @desc    Update a blog
// @access  Private
router.put('/:id', protect, async (req, res) => {
  const { title, content } = req.body;
  
  try {
    let blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    
    // Check if user is the blog author
    if (blog.author.toString() !== req.user.id) {
      return res.status(401).json({ error: 'User not authorized' });
    }
    
    // Update blog
    blog.title = title;
    blog.content = content;
    
    await blog.save();
    
    res.json(blog);
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   DELETE /api/blogs/:id
// @desc    Delete a blog
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    
    // Check if user is the blog author
    if (blog.author.toString() !== req.user.id) {
      return res.status(401).json({ error: 'User not authorized' });
    }
    
    await Blog.deleteOne({ _id: req.params.id });
    
    res.json({ msg: 'Blog removed' });
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 