# Blog Application

A full stack blog application built with React, Node.js, Express, and MongoDB.

## Features

- User authentication using email and password
- Create, view, edit, and delete blog posts
- Public blog listing with pagination
- Responsive design for both desktop and mobile devices

## Tech Stack

### Frontend
- React
- React Router
- Bootstrap
- Axios

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

## Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
```
git clone https://github.com/shiva-xlnc/blog-app.git
cd blog-app
```

2. Install backend dependencies
```
cd backend
npm install
```

3. Set up environment variables
Create a `.env` file in the backend directory with the following variables:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/blog-app
JWT_SECRET=your_jwt_secret
```

4. Install frontend dependencies
```
cd ../frontend
npm install
```

### Running the Application

1. Start the backend server
```
cd backend
npm run dev
```

2. Start the frontend application
```
cd frontend
npm start
```

3. Open your browser and navigate to `http://localhost:3000`

## Deployment

### Backend
The backend can be deployed to platforms like Heroku, AWS, or Google Cloud.

### Frontend
The frontend can be deployed to platforms like Netlify, Vercel, or AWS S3.

## License
MIT 
