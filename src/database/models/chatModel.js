const connection = require('./connection');

const addChatMessage = async (nick, message, date) =>
    connection()
    .then((db) => db.collection('messages').insertOne({
        nick,
        message,
        date,
    }));

const getThirtyMessages = async () =>
    connection()
    .then(async (db) => {
        const qtd = await db.collection('messages').find().count();
        console.log(qtd);
        if (qtd > 30) {
            return db.collection('messages')
                .find().skip(qtd - 30).toArray();
        }
        return db.collection('messages').find().toArray();
    });

const getAllMessages = async () =>
    connection()
    .then(async (db) => db.collection('messages').find().toArray());

module.exports = {
    addChatMessage,
    getThirtyMessages,
    getAllMessages,
};