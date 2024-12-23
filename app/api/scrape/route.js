import puppeteer from "puppeteer-core";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const search_term = searchParams.get("search_term") || "laptop"; // Add default value
    
    if (!process.env.PROXY_CONFIG) {
      throw new Error("PROXY_CONFIG environment variable is not set");
    }

    const browser = await puppeteer.connect({
      browserWSEndpoint: process.env.PROXY_CONFIG,
      // Add these options to help with timeout issues
      defaultViewport: {
        width: 1920,
        height: 1080,
      },
    });

    const page = await browser.newPage();
    
    // Set shorter timeout and add error handling
    const navigationTimeout = 30000; // 30 seconds
    page.setDefaultNavigationTimeout(navigationTimeout);

    try {
      await page.goto("https://www.amazon.com", { 
        waitUntil: "networkidle0",
        timeout: navigationTimeout
      });

      // Wait for and type in search box
      await page.waitForSelector("#twotabsearchtextbox", { timeout: 5000 });
      await page.type("#twotabsearchtextbox", search_term);
      await page.keyboard.press("Enter");

      // Wait for results with shorter timeout
      await page.waitForSelector(".s-card-container", { timeout: 10000 });

      const data = await page.evaluate(() => {
        const products = Array.from(document.querySelectorAll(".s-card-container"));
        return products.map(el => ({
          url: el.querySelector("a")?.href || "",
          imageCover: el.querySelector(".s-image")?.src || "",
          title: el.querySelector("h2 span")?.textContent?.trim() || "",
          price: el.querySelector(".a-price .a-offscreen")?.textContent?.trim() || "",
        }));
      });

      await browser.close();
      
      return new Response(JSON.stringify({ success: true, data }), {
        headers: { 
          "Content-Type": "application/json",
          "Cache-Control": "s-maxage=300" // Add caching
        },
      });

    } catch (error) {
      await browser.close();
      throw error;
    }

  } catch (error) {
    console.error("Scraping error:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}