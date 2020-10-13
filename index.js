const puppeteer = require("puppeteer");

async function get() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  const page = await browser.newPage();

  const url = "https://chicago.craigslist.org/search/sss?query=piano&sort=rel";

  await page.goto(url);

  await page.waitFor(".result-row");

  const results = await page.$$eval(".result-row", (rows) => {
    return rows.map((row) => {
      const properties = {};
      const titleElement = row.querySelector(".result-title");
      properties.title = titleElement.innerText;
      properties.url = titleElement.getAttribute("href");
      const priceElement = row.querySelector(".result-price");
      properties.price = priceElement ? priceElement.innerText : "";
      const imageElement = row.querySelector('.swipe [data0index="0"] img');
      properties.imageUrl = imageElement ? imageElement.src : "";
      return properties;
    });
  });

  console.log(results);

  browser.close();
}

get();
