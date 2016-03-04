// Alexa SDK for JavaScript v1.0.00
// Copyright (c) 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved. Use is subject to license terms.

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, tell Greeter to say hello"
 *  Alexa: "Hello World!"
 */

/**
 * App ID for the skill
 */
var CONFIG = require('config');
var APP_ID = CONFIG.amazonAppId;
var DATA = require('data');

var debugMode = true;
debugMode = !debugMode;

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

var Skill = function () {
		AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Skill.prototype = Object.create(AlexaSkill.prototype);
Skill.prototype.constructor = Skill;

Skill.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
		console.log("InsultMe onSessionStarted requestId: " + sessionStartedRequest.requestId
				+ ", sessionId: " + session.sessionId);
		// any initialization logic goes here
};

Skill.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
	console.log("InsultMe onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
	handleSessionStartIntent(session, response);
};

Skill.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
		console.log("InsultMe onSessionEnded requestId: " + sessionEndedRequest.requestId
				+ ", sessionId: " + session.sessionId);
		// any cleanup logic goes here
};

Skill.prototype.intentHandlers = {
		// register custom intent handlers
	SessionStartIntent: function (intent, session, response) {
		handleSessionStartIntent(session, response);
	},
	QuitIntent: function (intent, session, response) {
		handleQuitIntent(intent, session, response);
	}
};

function handleSessionStartIntent(session, response) {
	var quote = getRand(DATA.insults);
    response.tellWithCard(quote, CONFIG.skillTitle, quote);
};

function handleQuitIntent(intent, session, response) {
	var speechOutput = "Thank you for playing Future.";
	response.tell(speechOutput);
}

function debug(intent, session, response) {
	console.log("*************************");
	console.log("INTENT");
	console.log(intent);
	console.log("SESSION");
	console.log(session);
	console.log("RESPONSE");
	console.log(response);
}

function getRand(array) {
	return array[Math.floor(Math.random()*array.length)]
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
		// Create an instance of the InsultMe skill.
		var skill = new Skill();
		skill.execute(event, context);
};
