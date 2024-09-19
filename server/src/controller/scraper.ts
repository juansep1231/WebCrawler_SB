import axios from 'axios';
import * as cheerio from 'cheerio';
import { Entry } from '../models/types';

export async function scrapeHackerNews(): Promise<Entry[]> {
    const { data: entryData } = await axios.get('https://news.ycombinator.com/');
    const $ = cheerio.load(entryData);
    const entries: Entry[] = [];
  
    $('.athing').each((index, element) => {
      if (index >= 30) return false; 
      const numberOrder = $(element).find('.rank').text();
      const numberMatch = numberOrder.match(/(\d+)\./);
      const number = numberMatch ? parseInt(numberMatch[1]) : 0;
      
      const title = $(element).find('.titleline > a').text();
      
      const subtext = $(element).next().find('.subtext');
      const pointsText = subtext.find('.score').text();
      const pointsNumber = pointsText.match(/(\d+)\s+points/);
      const points = pointsNumber? parseInt(pointsNumber[1]) : 0;

      const commentsText = subtext.find('a').last().text();
      const commentsNumber = commentsText.match(/(\d+)\scomment/);
      const comments = commentsNumber ? parseInt(commentsNumber[1]) : 0;
  
      entries.push({number, title, points, comments });
    });
  
    console.log("scrapped",entries);
    return entries;
  }