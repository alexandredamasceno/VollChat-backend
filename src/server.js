require('dotenv').config();
const express = require('express');

const app = express();
const httpServer = require('http').createServer(app);
const bodyParser = require('body-parser');

// Aqui fazemos o parsing das requisições do cliente(browser)
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

const io = require('socket.io')(httpServer, {
    cors: {
        origin: `http://localhost:${PORT}`,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
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

io.on('connection', () => {
    const nickName = createNicknameRandom(16);
    // USERS.push(nickName);
    io.emit('message', `${nickName} acabou de entrar`);
});

httpServer.listen(PORT, () => {
    console.log(`Servidor online na porta ${PORT}`);
});