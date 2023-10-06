const banner1 = require("../assets/banner1.png");

const banners = [
  {
    name: "PocketX",
    img: banner1,
    url: "www.google.com",
    description: "Utility Websites in your PocketX",
  },
];

//categories to table in database
const categories = ["Website", "Web3", "GameFiHub"];

const bannerCategories = [
  "All",
  "Image Processing",
  "DevTools",
  "Online Streaming",
];

//features
const features = [
  "Daily Useful",
  "Developer Courses",
  "Image Processing",
  "DevTools",
  "Online Streaming",
  "DIY",
  "AI",
  "Vedio & Music & Audio",
];

const web3_features = ["Defi", "NFT", "GameFi", "DAO", "Metaverse"];

const GameFiHubFeatures = ["GameFi", "NFT", "DAO", "Metaverse"];

const needUpdate = [];

module.exports = {
  banners,
  features,
  web3_features,
  GameFiHubFeatures,
  bannerCategories,
  needUpdate,
  categories,
};
