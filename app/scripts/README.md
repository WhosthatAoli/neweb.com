1. 如何更新截图
npm run updateScreenshot


2. 如何选择特定网站更新截图
在 constant/index.js 中添加一个 needUpdate 数组, 例如:
const needUpdate = ["https://www.yfsp.tv/", "https://example.com/"];

如果needUpdate有值则更新这些网站,如果needUpdate长度为 0 则更新全部网站截图

3. 截图图片保存大小设置
代码 23 行
const optimizedImage = await sharp(buffer)
        .png({ quality: 90 })     <= 这里的值越小图片大小越小,但是会越失真
        .toBuffer();




