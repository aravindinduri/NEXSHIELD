import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import { scrapeWebsite } from './services/scrapingService.js';

dotenv.config();
const app = express();

app.use(express.json());

// Database Connection
connectDB();

// API Routes
app.use('/api', userRoutes);

// Scraping Example
app.get('/scrape', async (req, res) => {
  try {
    const url = req.query.url;
    const vulnerabilities = await scrapeWebsite(url);
    res.json(vulnerabilities);
  } catch (error) {
    res.status(500).json({ message: 'Error scraping website' });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
