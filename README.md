# MERN E-commerce Platform

This is a full-stack e-commerce application built with the MERN stack (MongoDB, Express.js, React, Node.js). It features role-based authentication, product and category management, a shopping cart, and a clean user interface.

## Key Features

- **User Authentication:** Secure user registration and login system using JSON Web Tokens (JWT).
- **Role-Based Access Control:** Distinct routes and components for regular users and administrators.
- **Product Management:** Admins can create, view, update, and delete products.
- **Category Management:** Admins can organize products by creating, updating, and deleting categories.
- **Product Filtering:** Users can filter products by price and category.
- **Shopping Cart:** Persistent shopping cart functionality for logged-in users.
- **Admin Dashboard:** A dedicated dashboard for admins to manage the application's content.
- **User Dashboard:** A dashboard for users to manage their profile and view orders.

---

## Technologies Used

### Backend
- **Node.js:** JavaScript runtime environment.
- **Express.js:** Web application framework for Node.js.
- **MongoDB:** NoSQL database for storing application data.
- **Mongoose:** Object Data Modeling (ODM) library for MongoDB.
- **JSON Web Token (JWT):** For securing API endpoints and managing user sessions.
- **bcrypt:** For hashing user passwords before storing them.
- **cors:** For enabling Cross-Origin Resource Sharing.
- **dotenv:** For managing environment variables.

### Frontend
- **React:** JavaScript library for building user interfaces.
- **React Router:** For handling client-side routing.
- **Axios:** For making HTTP requests to the backend API.
- **Ant Design:** A UI design language and React UI library.
- **React Hot Toast:** For adding notifications to the application.

---

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- **Node.js** (v14 or later recommended)
- **npm** (comes with Node.js)
- **MongoDB:** Make sure you have a running instance of MongoDB. You can use a local installation or a cloud service like MongoDB Atlas.

### Installation & Setup

1.  **Clone the Repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Setup the Backend Server:**
    - Navigate to the project's root directory.
    - Install the required npm packages:
      ```bash
      npm install
      ```
    - Create a `.env` file inside the `config/` directory. You can copy the example file:
      ```bash
      cp config/.env.example config/.env
      ```
    - Open `config/.env` and fill in the required environment variables:
      - `MONGO_URI`: Your MongoDB connection string.
      - `JWT_SECRET`: A strong, unique secret key for signing JWTs.

3.  **Setup the Frontend Client:**
    - Navigate to the `client` directory:
      ```bash
      cd client
      ```
    - Install the required npm packages:
      ```bash
      npm install
      ```
    - Create a `.env` file in the `client/` directory by copying the example:
      ```bash
      cp .env.example .env
      ```
    - The `REACT_APP_API` variable in `client/.env` should point to your backend server's URL (default is `http://localhost:8080`), so no changes are needed if you run the server on the default port.

### Running the Application

1.  **Start the Backend Server:**
    - From the root directory, run:
      ```bash
      npm start
      ```
    - The server will start on the port specified in your environment (defaults to 8080).

2.  **Start the Frontend Client:**
    - Open a new terminal window.
    - From the `client` directory, run:
      ```bash
      npm start
      ```
    - The React development server will start, and your application will be accessible at `http://localhost:3000`.

---

## Admin Role

To designate a user as an administrator, you need to manually update their role in the database.
- In your MongoDB `ecomusers` collection, find the user document.
- Change the `role` field from `0` (default user) to `1` (admin).
- The user will now have access to the admin dashboard and administrative routes.
