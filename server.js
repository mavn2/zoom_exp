// Dependencies
const express = require("express")
const path = require("path");
require("dotenv").config()

// Init express app
const app = express();

//Set Port for live/dev envs
const PORT = process.env.PORT || "4500";

//Adds middleware to parse received urls
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//Sets path to public dir. for use on server
app.use(express.static(path.join(__dirname, "public")));

//Require our route file to handle routing
//This file also includes Zoom logic to handle route
require("./routes/routes.js")(app)

//Initialize our app
app.listen(PORT, () => {
  console.log(
    "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
    PORT,
    PORT,
  )
});
