const cron = require('node-cron');
const { scrapeVulnerabilities } = require('../controllers/scraperController');
const { notifyOrganizations } = require('../controllers/notificationController');

// Schedule scraper
cron.schedule('0 6 * * *', async () => {
    console.log('Running scraper...');
    await scrapeVulnerabilities();
});

// Schedule notifications
cron.schedule('0 9 * * *', async () => {
    console.log('Running notifications...');
    await notifyOrganizations();
});
