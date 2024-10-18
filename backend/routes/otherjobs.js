const express = require('express');
const { default: puppeteer } = require('puppeteer');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    //Link to target page
    await page.goto(
      'https://itduunit.fi/tyopaikat?kategoria0=Ohjelmistokehitt%C3%A4j%C3%A4&kategoria0=Full%20Stack%20Developer&kategoria0=Backend%20Developer&kategoria0=Frontend%20Developer&kategoria0=Web%20Developer&sivu=1',
      {
        waitUntil: 'networkidle2',
      },
    );



    const pageResult = await page.evaluate(() => {
      const paginationCount = document.querySelector('.pagination__count').innerText;
      const joblistItems = document.querySelectorAll('.jobentry__item');
      const pageContent = Array.from(joblistItems).map(item => {
        return {
          title: item.querySelector('.jobentry__title')?.innerText,
          date: item.querySelector('.jobentry__date')?.innerText,
          company: item.querySelector('.jobentry__company')?.innerText,
          link: item.querySelector('a')?.href
        }
      })
      return {paginationCount, pageContent}
    });

    const data = pageResult

    await browser.close();

    res.json({ data });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(401).json(error.message);
  }
});

module.exports = router;
