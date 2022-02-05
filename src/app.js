require('dotenv').config();
const express = require('express');

const app = express();
const httpServer = require('http').createServer(app);
const bodyParser = require('body-parser');

// Aqui fazemos o parsing das requisições do cliente(browser)
app.use(bodyParser.json());

// const PORT = process.env.PORT || 3000;

const io = require('socket.io')(httpServer, {
    cors: {
        origin: 'http://localhost:8080',
    },
});

const chatController = require('./database/controllers/chatController');

// const createNicknameRandom = (length) => {
//     let newNickname = '';
//     const caracters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     for (let i = 0; i < length; i += 1) {
//         newNickname += caracters.charAt(Math.floor(Math.random() * caracters.length));
//     }
//     return newNickname;
// };

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
        // const data = await chatController.allMessages();
        io.emit('newMessage', message);
    });
});

app.get('/', async (req, res) => {
    const messages = await chatController.getMessages();
    
    return res.status(200).json(messages);
});

module.exports = httpServer;