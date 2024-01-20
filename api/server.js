// server.js
const ngrok = require('ngrok');
const app = require('./application');

const port = 3000;

const startServer = async () => {
  const server = app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });
  try {
    const url = await ngrok.connect({
      proto: 'http',
      addr: process.env.PORT || port,
    });
    console.log(`Ngrok tunnel is active at: ${url}`);
  } catch (err) {
    console.error('Error while connecting Ngrok', err);
    throw new Error('Ngrok Failed');
  }
};

module.exports = startServer;
