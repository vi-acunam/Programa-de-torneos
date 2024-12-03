// functions/submit-poll.js
const faunadb = require('faunadb');  // FaunaDB client

const q = faunadb.query;
const client = new faunadb.Client({
    secret: 'fnAFxuQGynAAQOAcusIPMrWDT7_kUk7ZSpmivv81'  // Replace with your FaunaDB secret key
});

exports.handler = async (event, context) => {
    if (event.httpMethod === 'POST') {
        // Parse the incoming JSON body
        const { language } = JSON.parse(event.body);

        // Ensure the language value exists
        if (!language) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'No language selected.' })
            };
        }

        try {
            // Create a new record in FaunaDB
            const result = await client.query(
                q.Create(
                    q.Collection('PollResponses'),  // Replace with your collection name
                    { data: { language } }
                )
            );

            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Response saved successfully!' })
            };
        } catch (error) {
            console.error('Error saving to FaunaDB:', error);
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Error saving response to database.' })
            };
        }
    } else {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method Not Allowed' })
        };
    }
};
