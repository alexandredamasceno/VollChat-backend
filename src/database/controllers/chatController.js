const chatModel = require('../models/chatModel');

const addNewMessage = async ({
        nick,
        message,
        date,
    }) => chatModel
    .addChatMessage(nick, message, date);

const thirtyMessages = async () => {
    const messages = await chatModel.getThirtyMessages();

    return messages;
};

const allMessages = async () => {
    const result = await chatModel.getMessages();

    return result;
};

module.exports = {
    addNewMessage,
    thirtyMessages,
    allMessages,
};