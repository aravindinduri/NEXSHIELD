const express = require('express');
const { scrapeVulnerabilities } = require('../controllers/scraperController');

const router = express.Router();

router.get('/', scrapeVulnerabilities);

module.exports = router;
