import puppeteer from "puppeteer-core";

const BROWSER_WS = process.env.PROXY_CONFIG;
// const BROWSER_WS = process.env.PROXY_CONFIG;
const web_url = "https://www.amazon.com";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const search_term = searchParams.get("search_term") || "laptop"; // Default to "laptop" if no term provided

  const browser = await puppeteer.connect({
    browserWSEndpoint: BROWSER_WS,
  });

  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(2 * 60 * 1000);
  await page.goto(web_url, { waitUntil: "domcontentloaded" });
  await page.waitForSelector("#twotabsearchtextbox", { timeout: 30000 });
  await page.type("#twotabsearchtextbox", search_term);
  await page.keyboard.press("Enter");
  await page.waitForSelector(".s-card-container", { timeout: 30000 });

  const data = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".s-card-container")).map(el => ({
      url: el.querySelector("a")?.getAttribute("href"),
      imageCover: el.querySelector(".a-section.s-image-fixed-height img")?.getAttribute("src"),
      title: el.querySelector(`h2 span`)?.innerText,
      price: el.querySelector(".a-price > .a-offscreen")?.innerText,
    }));
  });

  await browser.close();

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}
