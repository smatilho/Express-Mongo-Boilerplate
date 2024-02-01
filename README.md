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


## Configuration

This project requires a `.env` file to be placed in the project root directory (`./`). This file should contain the following environment variables:

```properties
DATABASE='mongodb://127.0.0.1:27017/'
PORT=4000
JWT_SECRET="Your JWT Secret"
LOG_LEVEL=debug
NODE_ENV=development
clientid=Your Discord Client ID
clientsecret=Your Discord Client Secret
bottoken="Your Discord Bot Token"
channelid=Your Discord Channel ID
```