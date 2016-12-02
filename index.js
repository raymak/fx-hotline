"use strict";

const self = require("sdk/self");
const { ToggleButton } = require('sdk/ui/button/toggle');
const sdkPanels = require("sdk/panel");

console.log("Hello World!");

const button = ToggleButton({
  id: "my-button",
  label: "my button",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onChange: handleChange
});

const myPanel = sdkPanels.Panel({
  width: 300,
  height: 100,
  contentURL: './panel.html',
  contentScriptFile: './panel.js',
  onHide:handleHide
});

myPanel.port.on('log', (s) => {
	console.log(s)
	});

myPanel.port.on('submit', (text)=>{
	console.log(`The text is: ${text}`);
	sendFeedback(text);
});

function handleChange(state) {
  if (state.checked) {
    myPanel.show({
      position: button
    });
  }
}

function handleHide() {
  button.state('window', {checked: false});
}

function sendFeedback(text){

	const url = `https://www.surveygizmo.com/s3/3218190/Fx-Instant-Feedback?feedback=${text}`;
	console.log('sending feedback: ', url);
	const Request = require("sdk/request").Request;
	const sgRequest = Request({
		url: url,
	    onComplete(response){
	  	  console.log("feedback sent!");
	  	}
	});

	sgRequest.get();
}

