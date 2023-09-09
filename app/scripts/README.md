1. 如何更新截图
npm run updateScreenshot

2. 如何选择特定网站更新截图
在 constant/index.js 中添加一个 needUpdate 数组, 例如:
const needUpdate = ["https://www.yfsp.tv/", "https://example.com/"];

* 如果needUpdate有值则更新这些网站,如果needUpdate长度为 0 则更新全部网站截图

3. 截图图片保存大小设置
在代码 23 行进行更改, 例如:
const optimizedImage = await sharp(buffer)
        .png({ quality: 90 })     <= 这里的值越小图片大小越小,但是会越失真
        .toBuffer();

4. 添加更多的需要更新截图的数组
在app/scripts/updateScreenshots.js中的第 53 行添加新的调用updateScreenshots方法即可更新新的数组里的 url 截图. 例如:
updateScreenshots(web3, needUpdate, 'web3'); 

* 注意参数 1 和参数 3 的值要保持一样.
* 所有的updateScreenshots方法的调用共用needUpdate数组的值. 所以当运行时,needUpdate里面提到的网址在所有需要更新的数组中都会自动更新

