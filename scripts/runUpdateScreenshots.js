const { websites, needUpdate, web3 } = require('../constant/index');
const { updateScreenshots } = require('./updateScreenshots');

updateScreenshots(websites, needUpdate, 'websites');  // 参数 1 和参数 3 保持和constant/index.js中的变量名一致
updateScreenshots(web3, needUpdate, 'web3');    // 需要更新新的数组里的截图,就创建新的updateScreenshots方法
