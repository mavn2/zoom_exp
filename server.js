// Dependencies
const express = require("express")
const path = require("path");
require("dotenv").config()

// Create express app and server
const app = express();
const server = require("http").createServer(app);


// Attach socket.io library to our server, simplifying the process 
// of creating non-client side listeners for client side code
const io = require("socket.io")(server);

// Set Port for live/dev environments
const PORT = process.env.PORT || "4500";

// Adds middleware to parse received urls
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sets path to public directory for code running on express server
app.use(express.static(path.join(__dirname, "public")));

// Require our routes file to handle routing, passing in required variables
require("./routes/routes.js")(app, io);

//Launch our app
server.listen(PORT, () => {
  console.log(
    "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
    PORT,
    PORT,
  )
});
