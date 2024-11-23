const express = require('express');
const { notifyOrganizations } = require('../controllers/notificationController');

const router = express.Router();

router.post('/', notifyOrganizations);

module.exports = router;
