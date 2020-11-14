// Bind io function from linked script to constant
const socket = io();

// Reference above to create a listener that calls a function 
// in response to app's backend server
socket.on('connect', () => {
  console.log("connected");
});