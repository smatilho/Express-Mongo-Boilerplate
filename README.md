# My First Boilerplate

This is a boilerplate project for a Node.js application. It uses MongoDB as a database and includes configuration for JWT authentication.

## Installation

1. Clone the repository
2. Install dependencies with `npm install`

## Starting MongoDB

Start MongoDB with the following command:

`mongod --dbpath "~/data/db"`


## Running the Server

Instead of `npm start`, you can use nodemon for automatic reloading. Run the server with:

`npx nodemon`


## Environment Variables

The project uses the following environment variables:

- `DATABASE`: The MongoDB connection string. Default is `'mongodb://127.0.0.1:27017/'`.
- `PORT`: The port the server will listen on. Default is `4000`.
- `JWT_SECRET`: The secret key used for JWT authentication. Replace `"secret_here"` with your own secret key.
- `LOG_LEVEL`: The level of logging. Default is `debug`.
- `NODE_ENV`: The environment the application is running in. Default is `development`.

Remember to replace the default values with your own, especially `JWT_SECRET`.