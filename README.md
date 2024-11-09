<h1>Book Management API</h1>
A simple RESTful API for managing books in a library. <br>This application provides routes to register and authenticate users, and perform CRUD operations on books. <br>The application is built using Express.js, MongoDB, JWT for authentication, and bcrypt for password hashing.

Features
User Registration & Authentication: Users can register and log in. JWT tokens are used for authentication.
Book CRUD Operations: Create, read, update, and delete books. You can manage book details including title, author, genre, and status (available, borrowed, self-owned).
Book Filtering: Users can filter books by author, genre, or status.
Protected Routes: Some routes (like creating, updating, and deleting books) require authentication using JWT tokens.
Technologies Used
Node.js: JavaScript runtime for building the server-side application.
Express.js: Web framework for building REST APIs.
MongoDB: NoSQL database for storing user and book information.
Mongoose: ODM for MongoDB to interact with the database.
JWT (JSON Web Token): For secure authentication.
bcryptjs: For hashing and verifying passwords.
