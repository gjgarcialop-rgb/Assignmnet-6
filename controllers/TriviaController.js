const triviaModel = require('../models/TriviaModel');

// Get all topics
async function getTopics(req, res) {
    try {
        const topics = await triviaModel.getTopics();
        res.status(200).json(topics);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get questions by topic
async function getQuestionsByTopic(req, res) {
    try {
        const topic = req.params.topic;
        const limit = req.query.limit;
        const difficulty = req.query.difficulty;

        if (limit && (!Number.isInteger(Number(limit)) || Number(limit) < 1)) {
            return res.status(400).json({
                error: 'Limit must be a positive number'
            });
        }

        if (difficulty && !['easy', 'medium', 'hard'].includes(difficulty)) {
            return res.status(400).json({
                error: 'Difficulty must be one of the following: easy, medium, hard'
            });
        }

        const topics = await triviaModel.getTopics();

        const topicExists = topics.some(
            item => item.name.toLowerCase() === topic.toLowerCase()
        );

        if (!topicExists) {
            return res.status(404).json({
                error: 'Topic not found'
            });
        }

        const questions = await triviaModel.getQuestionsByTopic(
            topic,
            limit ? Number(limit) : null,
            difficulty
        );

        res.status(200).json(questions);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get a random question
async function getRandomQuestion(req, res) {
    try {
        const question = await triviaModel.getRandomQuestion();

        if (!question) {
            return res.status(404).json({
                error: 'No questions found'
            });
        }

        res.status(200).json(question);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Check an answer
async function checkAnswer(req, res) {
    try {
        const { id, guess } = req.body;

        if (!id || guess === undefined || guess === null ||
            String(guess).trim() === '') {
            return res.status(400).json({
                error: 'Question ID and guess are required'
            });
        }

        if (!Number.isInteger(Number(id)) || Number(id) < 1) {
            return res.status(400).json({
                error: 'Question ID must be a positive number'
            });
        }

        const question = await triviaModel.getQuestionById(Number(id));

        if (!question) {
            return res.status(404).json({
                error: 'Question not found'
            });
        }

        const correct =
            String(guess).trim().toLowerCase() ===
            String(question.answer).trim().toLowerCase();

        res.status(200).json({
            correct: correct,
            answer: question.answer
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Add a question
async function addQuestion(req, res) {
    try {
        const { topic, question, answer, difficulty } = req.body;

        if (
            typeof topic !== 'string' || !topic.trim() ||
            typeof question !== 'string' || !question.trim() ||
            typeof answer !== 'string' || !answer.trim() ||
            typeof difficulty !== 'string' || !difficulty.trim()
        ) {
            return res.status(400).json({
                error: 'Topic, question, answer, and difficulty are required'
            });
        }

        if (!['easy', 'medium', 'hard'].includes(difficulty)) {
            return res.status(400).json({
                error: 'Difficulty must be easy, medium, or hard'
            });
        }

        const newQuestion = await triviaModel.addQuestion(
            topic.trim(),
            question.trim(),
            answer.trim(),
            difficulty
        );

        res.status(201).json(newQuestion);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getTopics,
    getQuestionsByTopic,
    getRandomQuestion,
    checkAnswer,
    addQuestion
};
