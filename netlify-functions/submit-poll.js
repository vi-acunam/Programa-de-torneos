// functions/submit-poll.js
const faunadb = require('faunadb');  // Assuming you're using FaunaDB for storage

const q = faunadb.query;
const client = new faunadb.Client({
    secret: 'fnAFxuWA3VAAQpGkSuuJYiGiIsLPymrc76gh7Y5Q'  // Use your FaunaDB secret key
});

exports.handler = async (event, context) => {
    if (event.httpMethod === 'POST') {
        const { language } = JSON.parse(event.body);

        try {
            const result = await client.query(
                q.Create(
                    q.Collection('PollResponses'),
                    { data: { language } }
                )  // Remove the extra semicolon here
            );
            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Response saved successfully!' })
            };
        } catch (error) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Error saving response' })
            };
        }
    } else {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method Not Allowed' })
        };
    }
};
