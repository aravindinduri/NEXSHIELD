import axios from 'axios';
import cheerio from 'cheerio';

export const scrapeWebsite = async (url) => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const vulnerabilities = [];
    $('div.vulnerability').each((i, el) => {
      const title = $(el).find('h3').text();
      const description = $(el).find('p').text();
      vulnerabilities.push({ title, description });
    });

    return vulnerabilities;
  } catch (error) {
    console.error(`Error scraping ${url}: ${error.message}`);
    throw error;
  }
};
