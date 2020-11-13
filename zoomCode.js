//Dependencies
const axios = require("axios")

const zoom = {
  test: (id, pwd, name) => {console.log(id, pwd, name)},

  //Get unique signature and return meeting configuration settings
  setMeetingParameters: (id, meetingNum, meetingPwd) => {
    const zoomConfig = {
      apiKey: process.env.ZOOM_API,
      apiSecret: process.env.ZOOM_SECRET,
      meetingNumber: meetingNum, 
      leaveUrl: "http://localhost:3000/", // redirect to home if join fails
      userName: "", // required
      passWord: meetingPwd, 
      role: 0, // 0 : guest, 1 : host. Locked to guest--
      // host can't currently start meeting from app, but can join again as guest
    };

  // Create a string with the data required to generate a signature
  // Passing the obj directly causes a CORS error, I believe this is more secure
  const raw = JSON.stringify({
    meetingNumber: zoomConfig.id,
    role: zoomConfig.role,
  });

  axios("https://ttzoomsignature.herokuapp.com/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: raw,
  })
    // If successful, above returns a readable stream, first step converts to string
    .then((response) => {console.log(response.data)})
    .catch((error) => {console.log(error)})
  }
};

module.exports = zoom;