const express = require('express');
const cors = require('cors');
const userController = require('./controllers/userController');
const chileanCompanyController = require('./controllers/chileanCompanyController');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', userController);
app.use('/api', chileanCompanyController);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Keep the process alive
process.on('SIGINT', () => {
  console.log('Shutting down server...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
}); 