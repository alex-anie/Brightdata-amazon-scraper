![brightdata](/locals/brightdata.png)

# Bright Data Web Scraping Challenge

This project is my official submission for the [Brightdata web Scraping challenge](https://dev.to/challenges/brightdata). 

## Live Demo

You can find the live [demo here](https://brightdata-amazon-scraper-gules.vercel.app/).

![live-preview](/locals/live-preview.gif)

## About Project

This project uses Brightdata to scrape data from Amazon and return the data output on the page. You can search anything you want and expect to see it load on the page as long what you search can be found on amazon.

## Use

Type the name of what you want to search for example, “laptop” and click the send icon. The website will display a loader but as soon as the data is returned it will render on the page.

## Project Setup

This is a Next.js 15 and React19 project. 

You can download or clone the [Github repo here](https://github.com/alex-anie/Brightdata-amazon-scraper.git).

```bash
npm run dev 
```

You the command above to run the project locally.

## Brightdata Setup

The project uses [Brightdata](https://brightdata.com) on the backend to scrape data dynamically, so you will need to include your own PROXY_CONFIG Api key from Brightdata to connect successfully on your local machine.

```jsx
// app/api/scrape/route.js

import puppeteer from "puppeteer-core";

const BROWSER_WS = process.env.PROXY_CONFIG; // put Brightdata pass key here 
web_url = "https://www.amazon.com";

// Some code here...
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}

```

## Others

Remember to check the `package.json` file to get an idea of the packages used to develop the project.