require('dotenv').config();
const express = require('express');

const app = express();
const httpServer = require('http').createServer(app);
const bodyParser = require('body-parser');

// Aqui fazemos o parsing das requisições do cliente(browser)
app.use(bodyParser.json());

const io = require('socket.io')(httpServer, {
    cors: {
        origin: 'http://localhost:8080',
    },
});

const chatController = require('./database/controllers/chatController');

const USERS = [];

io.on('connection', async (socket) => {
    const messages = await chatController.thirtyMessages();
    io.emit('allUsers', USERS);
    io.emit('allMessages', messages);
    socket.on('myNickname', (nickName) => {
        USERS.push(nickName);
        io.emit('allUsers', USERS);
    });
    socket.on('clientMessage', async (message) => {
        await chatController.addNewMessage(message);
        io.emit('newMessage', message);
    });
});

module.exports = httpServer;