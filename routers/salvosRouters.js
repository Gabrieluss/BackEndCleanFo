const express = require('express');
const router = express.Router();
const salvosControllers = require('../controllers/salvosController');

router.use('/', salvosControllers);

module.exports = router;
