const connection = require('./connection');

const addChatMessage = (nickName, message, date) =>
    connection()
        .then((db) => db.collection('messages').insertOne({ nickName, message, date }));

const getAllMessages = () =>
    connection()
        .then((db) => db.collection('messages').find().toArray());

module.exports = {
    addChatMessage,
    getAllMessages,
};