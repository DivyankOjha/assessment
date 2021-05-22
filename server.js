const app = require('./app');

const server = require('http').createServer(app);

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
