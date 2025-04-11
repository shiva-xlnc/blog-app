import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { blogService } from '../services/api';

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Fetch blog data for editing
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blog = await blogService.getBlogById(id);
        setFormData({
          title: blog.title,
          content: blog.content
        });
      } catch (error) {
        console.error('Error fetching blog:', error);
        setFormError('Failed to load blog. It may not exist or you may not have permission to edit it.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlog();
  }, [id]);
  
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
      await blogService.updateBlog(id, formData);
      navigate(`/blogs/${id}`);
    } catch (error) {
      console.error('Error updating blog:', error);
      setFormError(error.response?.data?.error || 'Failed to update blog. Please try again.');
    } finally {
      setIsSubmitting(false);
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
  
  return (
    <div className="container mt-5">
      <h1 className="mb-4">Edit Blog</h1>
      
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
              ></textarea>
            </div>
            
            <div className="d-flex justify-content-between">
              <Link 
                to={`/blogs/${id}`}
                className="btn btn-outline-secondary"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBlog; 