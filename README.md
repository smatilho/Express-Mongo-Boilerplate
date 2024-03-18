# Twitter/Discord REST API Controlled Bot (Node.JS, Express.JS, MongoDB)

This project is a Node.js application that integrates with Discord and Twitter. It allows you to send messages to a Discord channel and post tweets on Twitter.

## Table of Contents

- [Installation](#installation)
- [Running the Server](#running-the-server)
- [Configuration](#configuration)
- [Discord Routes Usage Guide](#discord-routes-usage-guide)
- [License](#license)

## Installation

Before you start, make sure you have Node.js and MongoDB installed on your machine. Then, clone this repository and install the dependencies with the following commands:

```bash
git clone https://github.com/yourusername/yourrepository.git
cd yourrepository
npm install
```

Start MongoDB with the following command:

```bash
mongod --dbpath "~/data/db"
```

## Running the Server

Instead of `npm start`, you can use nodemon for automatic reloading. Run the server with:

`npx nodemon`


## Configuration

This project requires a `.env` file to be placed in the project root directory (`./`). This file should contain the following environment variables:

```properties
DATABASE='mongodb://127.0.0.1:27017/' # The MongoDB connection string
PORT=4000 # The port the server will listen on
JWT_SECRET="Your JWT Secret" # The secret key used to sign JWTs
LOG_LEVEL=debug # The level of logging to display
NODE_ENV=development # The environment the server is running in
bottoken="Your Discord Bot Token" # The token for your Discord bot
channelid=Your Discord Channel ID # The ID of the Discord channel to send messages to
TWITTER_EMAIL= # Your Twitter email
TWITTER_PASSWORD= # Your Twitter password
TWITTER_USERNAME= # Your Twitter username
```

# Discord Routes Usage Guide

This guide provides instructions on how to use the Discord routes in our Express application.

## POST /v1/discord/message

This endpoint allows you to send a message to a specific Discord channel.

**Request Body:**

```json
{
  "data": {
    "message": "Your message here"
  }
}
```

**Response:**

If the message is successfully sent, you will receive a response with a status code of 200 and a body like this:

```json
{
  "message": "Message sent"
}
```

If the Discord client is not ready, you will receive a response with a status code of 400 and a body like this:

```json
{
  "message": "Discord client is not ready"
}
```

## POST /v1/discord/ping-and-message

This endpoint allows you to send a message to a specific Discord channel and ping a specific member.

**Request Body:**

```json
{
  "data": {
    "memberId": "Discord member ID here",
    "message": "Your message here"
  }
}
```

**Response:**

If the message is successfully sent, you will receive a response with a status code of 200 and a body like this:

```json
{
  "message": "Ping and message sent"
}
```

If the Discord client is not ready, you will receive a response with a status code of 400 and a body like this:

```json
{
  "message": "Discord client is not ready"
}
```

**Note:** You need to replace `"Your message here"` and `"Discord member ID here"` with your actual message and Discord member ID. The Discord client and channel ID are fetched from the environment variables. Make sure they are set correctly in your environment.


# Twitter Routes Usage Guide

This guide provides instructions on how to use the Twitter routes in our Express application.

## POST /v1/twitter/tweet-message

This endpoint allows you to post a tweet on Twitter.

**Request Body:**

\`\`\`json
{
  "data": {
    "message": "Your tweet here"
  }
}
\`\`\`

**Response:**

If the tweet is successfully posted, you will receive a response with a status code of 200 and a body like this:

\`\`\`json
{
  "message": "Tweet posted"
}
\`\`\`

**Note:** You need to replace `"Your tweet here"` with your actual tweet. The Twitter username and password are fetched from the environment variables. Make sure they are set correctly in your environment.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.