import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { blogService } from '../services/api';

const CreateBlog = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    
    // Validation
    if (!formData.title.trim()) {
      setFormError('Please enter a title');
      return;
    }
    
    if (!formData.content.trim()) {
      setFormError('Please enter some content');
      return;
    }
    
    try {
      setIsSubmitting(true);
      const newBlog = await blogService.createBlog(formData);
      navigate(`/blogs/${newBlog._id}`);
    } catch (error) {
      console.error('Error creating blog:', error);
      setFormError(error.response?.data?.error || 'Failed to create blog. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="container mt-5">
      <h1 className="mb-4">Create New Blog</h1>
      
      {formError && (
        <div className="alert alert-danger" role="alert">
          {formError}
        </div>
      )}
      
      <div className="card shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Enter blog title"
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="content" className="form-label">Content</label>
              <textarea
                className="form-control"
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                rows="10"
                placeholder="Write your blog content here"
              ></textarea>
            </div>
            
            <div className="d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => navigate('/blogs')}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Publishing...' : 'Publish Blog'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog; 