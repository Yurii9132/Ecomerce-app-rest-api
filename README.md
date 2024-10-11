# E-commerce App REST API

## Overview
This project is a RESTful API for an e-commerce application. It provides endpoints for managing products, users, orders, and authentication.

## Features
- User authentication and authorization
- CRUD operations for products
- Order management
- Cart functionality

## Technologies Used
- Node.js
- Express.js
- PostgreSQl
- JWT for authentication

## Installation
1. Clone the repository:
  ```bash
  git clone https://github.com/Yurii9132/Ecommerce-app-rest-api.git
  ```
2. Navigate to the project directory:
  ```bash
  cd ecommerce-app-rest-api
  ```
3. Install dependencies:
  ```bash
  npm install
  ```

## Configuration
1. Create a `.env` file in the root directory and add the following environment variables:
  ```env
  PORT=5432
  POSTGRES_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret
  ```

## Running the Application
1. Start the server:
  ```bash
  npm start
  ```
2. The API will be accessible at `http://localhost:4001`.

## API Endpoints
- **Authentication**
  - `POST /api/auth/register` - Register a new user
  - `POST /api/auth/login` - Login a user

- **Products**
  - `GET /api/products` - Get all products
  - `POST /api/products` - Create a new product
  - `GET /api/products/:id` - Get a product by ID
  - `PUT /api/products/:id` - Update a product by ID
  - `DELETE /api/products/:id` - Delete a product by ID

- **Orders**
  - `GET /api/orders` - Get all orders
  - `POST /api/orders` - Create a new order
  - `GET /api/orders/:id` - Get an order by ID

- **Cart**
  - `GET /api/cart` - Get the current user's cart
  - `POST /api/cart` - Add an item to the cart
  - `DELETE /api/cart/:id` - Remove an item from the cart

## License
This project is licensed under the MIT License.

## Contact
For any inquiries, please contact [author8132@gmail.com](mailto:author8132@gmail.com).