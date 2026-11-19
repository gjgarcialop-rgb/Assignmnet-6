# Triviabook API Assignmnet-6

# Project Description
This assignment is building a trivia API using Node.js, Express, and PostgreSQL. The trivia allows users to retrieve topics, view questions, recieve random questions, check answers, and add new questions.

# npms and website used
Node.js

Express.js

PostgreSQL

Neon Database

Render

# Live Application

Render URL:  https://assignmnet-6.onrender.com

# API Endpoints

Method                Endpoint                      Description    

GET                   /triviabook/topics            GETS all trvia topics

GET                   /triviabook/topic/:topic      GETS questions by topic

GET                   /triviabook/random            GETS a random question

POST                  /triviabook/answer            POST/checks a submitted answer

POST                  /triviabook/question/add      POST a new trivia question

# Running the Project

1. Clone the Github repository
2. RUn npm install to install dependencies
3. Create a .env file containing your Neon DATABASE_URL
4. Run node server.js
5. run the local host

# Database
Application uses Neon as its PostgreSQL database which contains topics and question tables

# Deployment
Application is deployed using Render and is acessible through the live URL
