//Require path, implement relative routes
const path = require("path");

//Require zoom object w/ meeting methods
const zoom = require("../zoomCode");

// Define routes in function to be exported to app, allowing app and socket.io
// to be passed in as references
module.exports = (app, io) => {

  // Establishes default route
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
  
  
  // Takes user-specific parameters, and returns meeting configuration object
  app.post("/create", (req, res) => {
    zoom.setMeetingParameters(req.body.id, req.body.pwd, req.body.name)
    .then((data) => {
      io.sockets.emit("post", data);
      res.json(data);
    });
  });
};
