import express from 'express';
import cors from 'cors';
import { scrapeHackerNews } from './controller/scraper.ts';

const app = express();
app.use(cors());

app.get('/entries', async (req, res) => {
    const entries = await scrapeHackerNews();
    res.json(entries);
});
  
app.listen(3001, () => console.log('Server running on port 3001'));
