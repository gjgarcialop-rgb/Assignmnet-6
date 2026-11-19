// this file contains the entry points for the server, sets up the express server, and defines the routes for the API
const express = require('express');
require('dotenv').config();

const triviaRoutes = require('./routes/TriviaRoutes');

const app = express();

app.use(express.json());

app.use('/triviabook', triviaRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Trivia API!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});