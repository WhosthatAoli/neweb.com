const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const { websites } = require('../../constant/index');
const sharp = require('sharp');  // Make sure you've installed the sharp library

async function takeScreenshot(url, screenshotPath) {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

    try {
        await Promise.race([
            page.goto(url, { waitUntil: 'networkidle' }),  // Waits for no network connections for at least 500ms.
            new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout after 5 seconds')), 5000))
        ]);
    } catch (error) {
        console.warn(`Warning for ${url}: ${error.message}`);
    }

    const buffer = await page.screenshot();
    const optimizedImage = await sharp(buffer)
        .png({ quality: 90 })  // You can adjust the quality to balance between size and clarity
        .toBuffer();

    fs.writeFileSync(screenshotPath, optimizedImage);
    await browser.close();
}

async function updateScreenshots() {
  console.log("start screenshot");
  for (let site of websites) {
    if (site.url) {
      const screenshotPath = path.join(
        __dirname,
        "../../public/screenshots",
        `${site.name}.png`
      );
      await takeScreenshot(site.url, screenshotPath);
      site.img = `/screenshots/${site.name}.png`;
    }

    console.log("finish screenshot, start saving data: ");
    const fileContent = fs.readFileSync(path.join(__dirname, '../../constant/index.js'), 'utf-8');
    console.log("load file content");
    const updatedWebsitesContent = `const websites = ${JSON.stringify(websites, null, 2)};`;

    const newFileContent = fileContent.replace(/const websites = [\s\S]*?;/, updatedWebsitesContent + '\n');
    fs.writeFileSync(path.join(__dirname, '../../constant/index.js'), newFileContent, 'utf-8');
    console.log("finish saving data");
}

updateScreenshots();
