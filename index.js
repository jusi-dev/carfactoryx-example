const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const {authenticate} = require('@google-cloud/local-auth');
const {google} = require('googleapis');
const exp = require('constants');

var serviceName;
var serviceDescription;
var serviceDate;
var serviceTime;

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file compatible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/*
 * Load or request or authorization to call APIs.
 */
async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function listEvents(auth) {
  const calendar = google.calendar({version: 'v3', auth});

    const timeArrray = serviceTime.split(":");
    plusHour = parseInt(timeArrray[0]) + 1;
    finishedHour = `${plusHour}:${timeArrray[1]}:${timeArrray[2]}`;

  const event = {
    'summary': serviceName,
    'location': 'Solothurnstrasse 7, 4543 Deitingen',
    'description': serviceDescription,
    'start': {
      'dateTime': `${serviceDate}T${serviceTime}`,
      'timeZone': 'Europe/Zurich',
    },
    'end': {
      'dateTime': `${serviceDate}T${finishedHour}`,
      'timeZone': 'Europe/Zurich',
    },
    'reminders': {
      'useDefault': false,
      'overrides': [
        {'method': 'email', 'minutes': 24 * 60},
        {'method': 'popup', 'minutes': 10},
      ],
    },
  };
  
  calendar.events.insert({
    auth: auth,
    calendarId: 'primary',
    resource: event,
  }, function(err, event) {
    if (err) {
      console.log('There was an error contacting the Calendar service: ' + err);
      return;
    }
    console.log('Event created: %s', event.data.htmlLink);
  });
};

const express = require('express');
const app = express();
var cors = require('cors');
const port = 443;

app.use(cors());

app.get('/api', (req, res) => {
  const q = req.query;

  serviceName = q.serviceReq
  serviceDescription = q.serviceDesc;
  serviceDate = q.serviceDate;
  serviceTime = q.serviceTime;

  authorize().then(listEvents).catch(console.error);
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

console.log("Backend is ready");