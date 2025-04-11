import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { blogService } from '../services/api';
import { useAuth } from '../context/AuthContext';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Fetch blog data
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const data = await blogService.getBlogById(id);
        setBlog(data);
      } catch (err) {
        console.error('Error fetching blog:', err);
        setError('Failed to load blog. It may not exist or has been removed.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlog();
  }, [id]);
  
  // Handle delete blog
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this blog? This action cannot be undone.')) {
      try {
        await blogService.deleteBlog(id);
        navigate('/blogs');
      } catch (err) {
        console.error('Error deleting blog:', err);
        setError('Failed to delete blog. Please try again.');
      }
    }
  };
  
  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
        <Link to="/blogs" className="btn btn-primary">Back to Blogs</Link>
      </div>
    );
  }
  
  if (!blog) {
    return (
      <div className="container mt-5">
        <div className="alert alert-info" role="alert">
          Blog not found.
        </div>
        <Link to="/blogs" className="btn btn-primary">Back to Blogs</Link>
      </div>
    );
  }
  
  const isAuthor = user && blog.author && user.id === blog.author._id;
  
  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h1 className="card-title mb-3">{blog.title}</h1>
          
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="text-muted">
              By {blog.author?.name || 'Unknown'} • {formatDate(blog.createdAt)}
            </div>
            
            {isAuthor && (
              <div>
                <Link to={`/edit-blog/${blog._id}`} className="btn btn-outline-primary btn-sm me-2">
                  Edit
                </Link>
                <button 
                  className="btn btn-outline-danger btn-sm"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
          
          <div className="card-text">
            {blog.content.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <Link to="/blogs" className="btn btn-outline-secondary">
          &larr; Back to Blogs
        </Link>
      </div>
    </div>
  );
};

export default BlogDetail; 