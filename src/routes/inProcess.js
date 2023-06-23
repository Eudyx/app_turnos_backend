const express = require('express');
const router = express.Router();
const inProcessController = require('../controllers/inProcessController');

router.get('/', inProcessController.getInProcess);

module.exports = router;