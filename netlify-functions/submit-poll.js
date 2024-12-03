const admin = require('firebase-admin');

// Initialize Firebase Admin SDK (using environment variables for credentials)
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://(default).firebaseio.com',
});

const db = admin.firestore();

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Only POST requests are allowed' }),
    };
  }

  // Parse incoming data
  const body = JSON.parse(event.body);
  const { color } = body; // Get the selected color option

  if (!color) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Color field is required' }),
    };
  }

  // Save the response to Firestore
  try {
    await db.collection('poll_responses').add({
      color: color,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Vote submitted successfully' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error saving vote', error: error.message }),
    };
  }
};
