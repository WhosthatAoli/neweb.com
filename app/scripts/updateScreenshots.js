const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");
const { websites, needUpdate, web3 } = require("../../constant/index");
const sharp = require("sharp");

async function takeScreenshot(url, screenshotPath) {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await Promise.race([
      page.goto(url, { waitUntil: "networkidle" }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Timeout after 5 seconds")), 5000)
      ),
    ]);
  } catch (error) {
    console.warn(`Warning for ${url}: ${error.message}`);
  }

  const buffer = await page.screenshot();
  const optimizedImage = await sharp(buffer).png({ quality: 90 }).toBuffer();

  fs.writeFileSync(screenshotPath, optimizedImage);
  await browser.close();
}

async function updateScreenshots() {
  const fetchedUrls = new Set(); // This set will track which URLs we've already fetched

  console.log("start screenshot");
  for (let site of [...websites, ...web3]) {
    // If needUpdate is empty, or if the site's URL is in the needUpdate array, and we haven't fetched it before
    if (
      site.url &&
      (!needUpdate.length || needUpdate.includes(site.url)) &&
      !fetchedUrls.has(site.url)
    ) {
      const screenshotPath = path.join(
        __dirname,
        "../../public/screenshots",
        `${site.name}.png`
      );
      await takeScreenshot(site.url, screenshotPath);
      site.img = `/screenshots/${site.name}.png`;

      fetchedUrls.add(site.url); // Mark this URL as fetched
    }
  }

  console.log("finish screenshot, start saving data: ");
  const fileContent = fs.readFileSync(
    path.join(__dirname, "../../constant/index.js"),
    "utf-8"
  );
  const updatedWebsitesContent = `const websites = ${JSON.stringify(
    websites,
    null,
    2
  )};`;

  const newFileContent = fileContent.replace(
    /const websites = [\s\S]*?;/,
    updatedWebsitesContent + "\n"
  );
  fs.writeFileSync(
    path.join(__dirname, "../../constant/index.js"),
    newFileContent,
    "utf-8"
  );
  console.log("finish saving data");
}

updateScreenshots();
