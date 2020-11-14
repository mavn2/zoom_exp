//Dependencies
const axios = require("axios")

const zoom = {
  test: (id, pwd, name) => {console.log(id, pwd, name)},

  //Get unique signature and return meeting configuration settings
  setMeetingParameters: async (meetingNum, meetingPwd, userName) => {
    let zoomConfig = {
      apiKey: process.env.ZOOM_API,
      apiSecret: process.env.ZOOM_SECRET,
      meetingNumber: meetingNum, 
      leaveUrl: "http://localhost:3000/", // redirect to home if join fails
      userName: userName, // required
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

  const meetingConfig = await axios("https://ttzoomsignature.herokuapp.com/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: raw,
  })
    // Execute on success
    .then((response) => {
      // Add signature k/v pair to config object defined above
      // This allows the entire config to be returned as an object, simplifying the browser side code
      zoomConfig.signature = response.data.signature
      //Pass the completed object back to parent
      return zoomConfig;
    })
    .catch((error) => {console.log(error)})

    // Send completed object w/ all required data to caller
    return meetingConfig;
  }

};

module.exports = zoom;