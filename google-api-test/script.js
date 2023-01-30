const CLIENT_ID = '90878435704-20ri6385ar43hmr1rp7mieimsg87b1ku.apps.googleusercontent.com';
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
const SCOPES = 'https://www.googleapis.com/auth/calendar';

let API_KEY;

fetch('./carfactoryx-example-bfb1c69cb874.json')
  .then(response => response.json())
  .then(data => {
    API_KEY = data.apiKey;
});

API_KEY = "AIzaSyDJxwqiJIaiZlQYkZ3eKGE3dHUKGQnIJJU";

  gapi.load("client", function () {
    gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    });
    gapi.client.load("calendar", "v3", function () {
      listUpcomingEvents();
    });
  });

async function listUpcomingEvents() {
  let response;
  try {
    gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
      clientId: CLIENT_ID,
      scope: SCOPES
    });

    const request = {
      'calendarId': 'primary',
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 10,
      'orderBy': 'startTime',
    };
    response = await gapi.client.calendar.events.list(request);
  } catch (err) {
    document.getElementById('content').innerText = err.message;
    return;
  }

  const events = response.result.items;
  if (!events || events.length == 0) {
    document.getElementById('content').innerText = 'No events found.';
    return;
  }
  // Flatten to string to display
  const output = events.reduce(
      (str, event) => `${str}${event.summary} (${event.start.dateTime || event.start.date})\n`,
      'Events:\n');
  document.getElementById('content').innerText = output;
}
