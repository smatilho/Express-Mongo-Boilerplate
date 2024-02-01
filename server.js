require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const { default: mongoose } = require("mongoose");

const responseMiddleware = require("./middleware/responseMiddleware");
const errorHandler = require("./middleware/errorHandler");
const authenticateToken = require("./middleware/auth");
const { infoLogger, errorLogger, infoLoggerMiddleware, errorLoggerMiddleware } = require('./helpers/logger');

const app = express();

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

//currently setup so that mongo connects to whichever DB is selected in .env (using UNH to test atm)
//need to be 'database' instead of '127.0.0.1' to work with docker
currentDB = process.env.DATABASE;
infoLogger.info(`Using ${currentDB} database`);

mongoose.connect(currentDB, {
  useUnifiedTopology: true,
}).then(() => {
  infoLogger.info("MongoDB connection established");
}).catch((error) => {
  errorLogger.error(`MongoDB connection error: ${error}`);
});

//TODO: If using postman to manually add a new history document or to update one, the endpoint does NOT check to see if a matching
// document already exists. It gets complicated to check if it exists and choose what to do next since updateLotStatus depends
// on these endpoints also. If we want better checks for the manual insertions, perhaps we should make new endpoints specifically
// to be used with full body json requests (i.e. those that come from postman).

const PORT = process.env.PORT;
// Use "nodemon server" to start
app.listen(PORT, function () {
  infoLogger.info("Server is running on Port: " + PORT);
});

// To start backend, use "nodemon server"
// To connect database, open two terminals. In the first, type 'mongod', and in the second do 'mongosh'