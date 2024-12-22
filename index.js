import puppeteer from "puppeteer-core";

const AUTH = process.env.PROXY_CONFIG;
// const BROWSER_WS = AUTH
const BROWSER_WS = "wss://brd-customer-hl_b7ee286e-zone-scraping_browser1:j38oa9jnulqq@brd.superproxy.io:9222"
const URL = "https://www.amazon.com";
// This sample code searches Amazon for your search term and then
// returns the list of product and prices.
// If there is a CAPTCHA, it will be solved automatically.

// enter what you want to type into the search box
const search_term = "laptop";

async function run(){
  const browser = await puppeteer.connect({
    browserWSEndpoint: BROWSER_WS,
  });
  console.log("Connected to browser...");
  console.log("Sending requests via residential proxies...");
  // Create a new page
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(2 * 60 * 1000);
  // Go to Amazon.com
  await page.goto(URL, { waitUntil: "domcontentloaded" });
  console.log("Navigated to home page");
  await page.waitForSelector("#twotabsearchtextbox", { timeout: 30000 });
  // Type a search term in the search input
  await page.type("#twotabsearchtextbox", search_term);
  console.log("Entered search term");
  await page.keyboard.press("Enter");
  // Wait for the products to load
  await page.waitForSelector(".s-card-container", { timeout: 30000 });
  console.log("Products loaded, parsing...");
  const data = await parse_results(page);


//   for (const { title, price, url, imageCover } of data)
//     console.log(`Found product: ${title}, ${price}, ${url} ${imageCover}
// `);

 // Log the data as a JSON object
 console.log(JSON.stringify(data, null, 2));


  await browser.close();
}

async function parse_results(page){
  return await page.evaluate(()=>{
    return Array.from(document.querySelectorAll(".s-card-container")).map(el => {
      return {
        url: el.querySelector("a")?.getAttribute("href"),
        imageCover: el.querySelector(".a-section.s-image-fixed-height img")?.getAttribute("src"),
        title: el.querySelector(`h2 span`)?.innerText,
        price: el.querySelector(".a-price > .a-offscreen")?.innerText,
      };
    });
  });
}

run();