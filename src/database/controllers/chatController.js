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

module.exports = {
    addNewMessage,
    thirtyMessages,
};