<h1>Book Management API</h1><br>
<ul><li>A simple RESTful API for managing books in a library.</li> <li>This application provides routes to register and authenticate users, and perform CRUD operations on books. </li><li>The application is built using Express.js, MongoDB, JWT for authentication, and bcrypt for password hashing.</li></ul>

<h2>Features</h2><br>
<h3>User Registration & Authentication:</h3> Users can register and log in. JWT tokens are used for authentication.<br>
<h3>Book CRUD Operations:</h3> Create, read, update, and delete books. You can manage book details including title, author, genre, and status (available, borrowed, self-owned).<br>
<h3>Book Filtering:</h3> Users can filter books by author, genre, or status.<br>
<h3>Protected Routes:</h3> Some routes (like creating, updating, and deleting books) require authentication using JWT tokens.<br>
<h2>Technologies Used<h2><br>
<h3>Node.js:</h3> JavaScript runtime for building the server-side application.<br>
<h3>Express.js: </h3>Web framework for building REST APIs.<br>
<h3>MongoDB: </h3>NoSQL database for storing user and book information.<br>
<h3>Mongoose:</h3> ODM for MongoDB to interact with the database.<br>
<h3>JWT (JSON Web Token):</h3> For secure authentication.<br>
<h3>bcryptjs: </h3>For hashing and verifying passwords.<br>
