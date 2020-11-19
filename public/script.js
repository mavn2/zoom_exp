/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
// Vars are set by scripts imported in index.html
// Reference event listener from socket.io code
const socket = io();

// Sets Zoom SDK version for app and loads required scripts
ZoomMtg.setZoomJSLib("https://source.zoom.us/1.8.1/lib", "/av");
ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();

// Get unique user id from url
const userId = location.pathname.slice(1);

// Attempts to connect to Zoom meeting, launches zoom client if successful
// Built on ZoomMtg object imported in index.html, called in response to server below
function joinMeeting(meetingConfig) {
  ZoomMtg.init({
    leaveUrl: location.href,
    // Enable two way audio-video over VoIP
    isSupportAV: true,

    success: (success) => {
      console.log("Init Success ", success);
      // Joins meeting using settings from object passed in as param,
      // then log result
      ZoomMtg.join({
        meetingNumber: meetingConfig.meetingNumber,
        userName: meetingConfig.userName,
        signature: meetingConfig.signature,
        apiKey: meetingConfig.apiKey,
        passWord: meetingConfig.passWord,

        success: (result) => {
          console.log(result);
        },

        error: (error) => {
          console.log(error);
        },
      });
    },
  });
}

// Use socket to listen for data sent from this app's server
// in response to a request from the Thanksgiving Together app
socket.on(userId, (data) => {
  joinMeeting(data);
});
