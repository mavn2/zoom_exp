// Dependencies
const axios = require("axios");

const zoom = {

  // Get unique signature and return meeting configuration settings
  setMeetingParameters: async (meetingNum, meetingPwd, userName) => {
    // zoomConfig variables are not currently rewritten here, but are in script.js
    // eslint-disable-next-line prefer-const
    let zoomConfig = {
      apiKey: process.env.ZOOM_API,
      apiSecret: process.env.ZOOM_SECRET,
      meetingNumber: meetingNum,
      leaveUrl: "", // redirect to user's page if join fails
      userName, // required
      passWord: meetingPwd,
      role: 0, // 0 : guest, 1 : host. Locked to guest--
      // host can't currently start meeting from app, but can join again as guest
    };

    const meetingConfig = axios({
      method: "post",
      url: "https://ttzoomsignature.herokuapp.com/",
      data: {
        meetingNumber: zoomConfig.meetingNumber,
        role: zoomConfig.role,
      },
    })
    // Execute on success
      .then((response) => {
        // Add signature k/v pair to config object defined above
        // Allows the entire config to be returned as an object, simplifying the browser side js
        zoomConfig.signature = response.data.signature;
        // Pass the completed object back to parent
        return zoomConfig;
      })
      .catch((error) => { console.log(error); });

    // Send completed object w/ all required data to caller
    return meetingConfig;
  },

};

module.exports = zoom;
