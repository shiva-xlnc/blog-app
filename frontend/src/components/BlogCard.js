import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Truncate content to 150 characters
  const truncateContent = (content) => {
    if (content.length <= 150) return content;
    return content.substring(0, 150) + '...';
  };
  
  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{blog.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">
          By {blog.author.name} • {formatDate(blog.createdAt)}
        </h6>
        <p className="card-text">{truncateContent(blog.content)}</p>
        <Link to={`/blogs/${blog._id}`} className="btn btn-primary">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard; 