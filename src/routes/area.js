const express = require('express');
const router = express.Router();
const areaController = require('../controllers/areaController');

router.route('/')
    .get(areaController.getAllAreas)
    .post(areaController.createArea);

router.get('/:id', areaController.getAreaById);

module.exports = router;