import React, { useState, useEffect } from 'react';
import { blogService } from '../services/api';
import BlogCard from '../components/BlogCard';
import Pagination from '../components/Pagination';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // Fetch blogs on component mount and when page changes
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await blogService.getBlogs(currentPage);
        setBlogs(response.blogs);
        setTotalPages(response.totalPages);
        setError(null);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError('Failed to load blogs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlogs();
  }, [currentPage]);
  
  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top when page changes
    window.scrollTo(0, 0);
  };
  
  return (
    <div className="container mt-5">
      <h1 className="mb-4">Latest Blogs</h1>
      
      {loading ? (
        <div className="text-center p-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : blogs.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No blogs found. Be the first to create one!
        </div>
      ) : (
        <>
          <div className="row">
            {blogs.map((blog) => (
              <div key={blog._id} className="col-md-6 col-lg-4 mb-4">
                <BlogCard blog={blog} />
              </div>
            ))}
          </div>
          
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default BlogList; 