
const axios = require('axios');
const cheerio = require('cheerio');
const Vulnerability = require('../models/Vulnerability');

exports.scrapeVulnerabilities = async (req, res) => {
    try {
        const url = 'https://example-oem.com/vulnerabilities'; // Replace with the actual URL
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const vulnerabilities = [];
        $('.vuln-item').each((i, el) => {
            const cveId = $(el).find('.cve-id').text().trim();
            const description = $(el).find('.description').text().trim();
            const severity = $(el).find('.severity').text().trim();
            const publishedDate = new Date($(el).find('.date').text().trim());

            vulnerabilities.push({ cveId, description, severity, publishedDate });
        });

        await Vulnerability.insertMany(vulnerabilities, { ordered: false });
        res.status(201).json({ message: 'Vulnerabilities saved successfully', vulnerabilities });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error scraping vulnerabilities', details: err.message });
    }
};
