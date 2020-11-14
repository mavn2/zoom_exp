//Require path, implement relative routes
const path = require("path");

//Require zoom object w/ meeting methods
const zoom = require("../zoomCode")

module.exports = (app) => {
  app.get("/:id/:pwd/:name", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"))
    });
  
  app.get("/api/:id/:pwd/:name", (req, res) => {
  (zoom.setMeetingParameters(req.params.id, req.params.pwd, req.params.name))
    .then((data) => {
      res.json(data)
    })
  });
};
 
async function test(req){
  result = await zoom.setMeetingParameters(req.params.id, req.params.pwd, req.params.name);
  console.log(result)
}