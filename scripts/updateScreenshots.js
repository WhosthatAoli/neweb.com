const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const sharp = require('sharp');

async function takeScreenshot(url, imgName) {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
        await Promise.race([
            page.goto(url, { waitUntil: 'networkidle' }),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout after 5 seconds')), 5000))
        ]);
    } catch (error) {
        console.warn(`Warning for ${url}: ${error.message}`);
    }

    const buffer = await page.screenshot();
    const optimizedImage = await sharp(buffer)
        .png({ quality: 90 })
        .toBuffer();
    const screenshotPath = path.resolve('./public/screenshots', `${imgName}.png`);
    fs.writeFileSync(screenshotPath, optimizedImage);
    await browser.close();
}

async function updateScreenshots(dataSet, updateSet, dataName) {
    const fetchedUrls = new Set();

    console.log("start screenshot");
    for (let site of dataSet) {
        if (site.url && (!updateSet.length || updateSet.includes(site.url)) && !fetchedUrls.has(site.url)) {
            await takeScreenshot(site.url, site.name);
            site.img = `/screenshots/${site.name}.png`;

            fetchedUrls.add(site.url);
        }
    }

    console.log("finish screenshot, start saving data: ");
    const fileContent = fs.readFileSync(path.join(__dirname, '../constant/index.js'), 'utf-8');
    const updatedDataContent = `const ${dataName} = ${JSON.stringify(dataSet, null, 2)};`;

    const newFileContent = fileContent.replace(new RegExp(`const ${dataName} = [\\s\\S]*?;`), updatedDataContent + '\n');
    fs.writeFileSync(path.join(__dirname, '../constant/index.js'), newFileContent, 'utf-8');
    console.log("finish saving data");
}

module.exports = {
    takeScreenshot,
    updateScreenshots
};


async function sleep(millis) {
    setTimeout(() => {
        console.log(`sleep ${millis} ms`);
    }, millis);
}