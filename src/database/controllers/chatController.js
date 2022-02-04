const chatModel = require('../models/chatModel');

const addNewMessage = async ({
        nick,
        message,
        date,
    }) => chatModel
    .addChatMessage(nick, message, date);

const getMessages = async () => {
    const messages = await chatModel.getAllMessages();

    return messages;
};

module.exports = {
    addNewMessage,
    getMessages,
};