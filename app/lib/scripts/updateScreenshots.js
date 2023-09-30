const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const sharp = require('sharp');

async function takeScreenshot(url, imgName) {
    try {
        const browser = await chromium.launch();
        // const context = await browser.newContext();
        const context = await browser.newContext({
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537'
        });
        const page = await context.newPage();
        await Promise.race([
            page.goto(url, { waitUntil: 'networkidle' }),
            new Promise((resolve) => setTimeout(() => resolve(console.log("wait 5 seconds")), 5000))
        ]);
        const buffer = await page.screenshot();
        const optimizedImage = await sharp(buffer)
            .png({ quality: 90 })
            .toBuffer();
        const screenshotPath = path.resolve('./public/screenshots', `${imgName}.png`);
        fs.writeFileSync(screenshotPath, optimizedImage);
        console.log(`Screenshot saved: ${screenshotPath}`);
        await browser.close();
        return optimizedImage;
    } catch (error) {
        console.warn(`Warning for "${url}", error: ${error.message}`);
        await browser.close();
        throw error;
    }
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