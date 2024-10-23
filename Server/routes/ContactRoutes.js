const express = require('express');
const { searchContacts } = require('../controllers/ContactsController');
const authenticateToken = require('../middlewares/AuthMiddleware');
const contactsRoutes = express.Router();
contactsRoutes.post('/search', authenticateToken, searchContacts);
module.exports = contactsRoutes;
