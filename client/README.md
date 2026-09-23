# Nuzio AI

A personalized news experience built as a full-stack assignment for Olinp Technology.

Nuzio AI allows users to log in, select their interests, receive a personalized news feed based on those interests, and listen to news stories using browser-based text-to-speech.

## Features

- User registration and login
- JWT-based authentication
- Interest selection after login
- Persistent user preferences
- Personalized news feed based on selected interests
- News categories, summaries, and reading duration
- Play/stop functionality for news stories
- Browser Speech Synthesis API for audio playback
- Responsive dark-themed interface

## Tech Stack

### Frontend

- React
- JavaScript
- Axios
- CSS

### Backend

- Node.js
- Express.js
- JWT
- JSON-based persistent preference storage
- REST APIs

## Project Structure

```text
nuzio-ai/
│
├── client/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── ...
│   └── package.json
│
├── server/
│   ├── data/
│   │   ├── preferences.js
│   │   └── preferences.json
│   ├── routes/
│   │   ├── auth.js
│   │   ├── news.js
│   │   └── preferences.js
│   ├── server.js
│   └── package.json
│
└── README.md


