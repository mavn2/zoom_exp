//Require path, implement relative routes
const path = require("path");

//Require zoom object w/ meeting methods
const zoom = require("../zoomCode")

module.exports = (app) => {
  app.get("/:id/:pwd/:name", (req, res) => {
    zoom.test(req.params.id, req.params.pwd, req.params.name)
    zoom.setMeetingParameters(req.params.id, req.params.pwd, req.params.name)
    res.sendFile(path.join(__dirname, "../public/index.html"))
  });
};
 