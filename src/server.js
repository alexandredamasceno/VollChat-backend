require('dotenv').config();
const httpServer = require('./app');

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
    console.log(`Servidor online na porta ${PORT}`);
});