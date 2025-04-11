import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated, user } = useAuth();
  
  return (
    <div className="container mt-5">
      <div className="jumbotron text-center p-5 bg-light rounded-3">
        <h1 className="display-4">Welcome to BlogApp</h1>
        <p className="lead">
          Share your thoughts, ideas and experiences with the world.
        </p>
        <hr className="my-4" />
        
        {isAuthenticated ? (
          <div>
            <p>Hello, {user.name}! Ready to share your story?</p>
            <Link to="/create-blog" className="btn btn-primary btn-lg me-2">
              Create a Blog
            </Link>
            <Link to="/blogs" className="btn btn-outline-secondary btn-lg">
              Browse Blogs
            </Link>
          </div>
        ) : (
          <div>
            <p>Join our community today to start sharing your stories!</p>
            <Link to="/register" className="btn btn-primary btn-lg me-2">
              Register
            </Link>
            <Link to="/login" className="btn btn-outline-secondary btn-lg me-2">
              Login
            </Link>
            <Link to="/blogs" className="btn btn-link btn-lg">
              Browse as Guest
            </Link>
          </div>
        )}
      </div>
      
      <div className="row mt-5">
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Create</h5>
              <p className="card-text">
                Write and share your thoughts with our simple and intuitive editor.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Connect</h5>
              <p className="card-text">
                Join a community of writers and readers from around the world.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Discover</h5>
              <p className="card-text">
                Explore diverse perspectives and ideas from other writers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 