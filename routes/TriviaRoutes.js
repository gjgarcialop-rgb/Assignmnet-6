// This file shows the routes for the trivia API, imports the controller, and defines the endpoints for the API
const express = require('express');
const router = express.Router();

const triviaController = require('../controllers/TriviaController');

router.get('/topics', triviaController.getTopics);

router.get('/topic/:topic', triviaController.getQuestionsByTopic);

router.get('/random', triviaController.getRandomQuestion);

router.post('/answer', triviaController.checkAnswer);

router.post('/question/add', triviaController.addQuestion);

module.exports = router;