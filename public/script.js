// Reference event listener from socket.io code imported in index.html
const socket = io();

// Sets Zoom SDK version for app and loads required scripts
ZoomMtg.setZoomJSLib("https://source.zoom.us/1.8.1/lib", "/av");
ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();

// Attempts to connect to Zoom meeting, launches zoom client if successful
// Built on ZoomMtg object imported in index.html, called in response to server below
function joinMeeting(meetingConfig) {
  ZoomMtg.init({
    leaveUrl: meetingConfig.leaveUrl,
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
  })
};

// Use socket to listen for data sent from this app's server
// in response to a request from the Thanksgiving Together app 
socket.on('post', (data) => {
  console.log(data)
  joinMeeting(data)
});