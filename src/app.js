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

const createNicknameRandom = (length) => {
    let newNickname = '';
    const caracters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i += 1) {
        newNickname += caracters.charAt(Math.floor(Math.random() * caracters.length));
    }
    return newNickname;
};

// const USERS = [];

io.on('connection', (socket) => {
    console.log(socket.id);
    const nickName = createNicknameRandom(16);
    // USERS.push(nickName);
    io.emit('serverMessage', `${nickName} acabou de entrar`);
    socket.on('Hello', (message) => {
        console.log(socket.id, message);
    });
});

app.get('/', (req, res) => res.send('Hello World!!!'));

module.exports = httpServer;