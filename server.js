require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const { Client, GatewayIntentBits } = require('discord.js');

const responseMiddleware = require("./middleware/responseMiddleware");
const errorHandler = require("./middleware/errorHandler");
const authenticateToken = require("./middleware/auth");
const { infoLogger, errorLogger, infoLoggerMiddleware, errorLoggerMiddleware } = require('./helpers/logger');

const app = express();

// Create and log in the Discord client
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers] });
client.login(process.env.bottoken);

// Make the Discord client available to routes
app.use((req, res, next) => {
    req.discordClient = client;
    next();
});

// Enable helmet for security
app.use(helmet());
// Enable CORS on all routes
app.use(cors()); 
// Middleware to parse JSON request bodies
app.use(express.json({limit: '5mb'}));
// Custom middleware for standardizing responses
app.use(responseMiddleware);


const v1UserRouter = require("./v1/routes/user.routes.js");
app.use("/v1/users", v1UserRouter);

const v1DiscordRouter = require("./v1/routes/discord/discord.routes.js");
app.use("/v1/discord", v1DiscordRouter);

const v1TwitterRouter = require("./v1/routes/twitter/twitter.routes.js");
app.use("/v1/twitter", v1TwitterRouter);


// Use the infoLoggerMiddleware to log information about each request and response
app.use(infoLoggerMiddleware);

// Use the errorLoggerMiddleware to log errors
app.use(errorLoggerMiddleware);

// Handles backend errors
app.use(errorHandler);

// Default case for unmatched routes
app.use((req, res) => {
  res.notFound("Route not found");
});

// currentDB = process.env.DATABASE;
// infoLogger.info(`Using ${currentDB} database`);

// mongoose.connect(currentDB, {
//   useUnifiedTopology: true,
// }).then(() => {
//   infoLogger.info("MongoDB connection established");
// }).catch((error) => {
//   errorLogger.error(`MongoDB connection error: ${error}`);
// });


const PORT = process.env.PORT;
app.listen(PORT, function () {
  infoLogger.info("Server is running on Port: " + PORT);
});