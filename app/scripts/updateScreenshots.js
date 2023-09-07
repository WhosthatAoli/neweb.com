const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const { websites } = require('../../constant/index');

async function takeScreenshot(url, screenshotPath) {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(url);
    await page.screenshot({ path: screenshotPath });

    await browser.close();
}

async function updateScreenshots() {
    console.log("start screenshot");
    for (let site of websites) {
        if (site.url) {
            const screenshotPath = path.join(__dirname, '../../public/screenshots', `${site.name}.png`);
            await takeScreenshot(site.url, screenshotPath);
            site.img = `/screenshots/${site.name}.png`;
        }
    }
    console.log("finish screenshot, start saving data: ");
    const fileContent = fs.readFileSync(path.join(__dirname, '../../constant/index.js'), 'utf-8');
    console.log("load file content");
    const updatedWebsitesContent = `const websites = ${JSON.stringify(websites, null, 2)};`;

    // console.log("fileContent: ", fileContent);

    // console.log("&&&&&&&&&&&&");

    // console.log("update websites content", updatedWebsitesContent);
    
    // Replace the original websites declaration with the updated one
    const newFileContent = fileContent.replace(/const websites = [\s\S]*?;/, updatedWebsitesContent + '\n');
    fs.writeFileSync(path.join(__dirname, '../../constant/index.js'), newFileContent, 'utf-8');
    console.log("finish saving data");
}

updateScreenshots();
