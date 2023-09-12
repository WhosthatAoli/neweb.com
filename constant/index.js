const banners = [
  {
    name: "Netflix",
    img: "https://source.unsplash.com/LaZfUnbyAmA",
    url: "https://www.netflix.com/",
    description: "This is Netflix",
  },
  {
    name: "Netflix",
    img: "https://source.unsplash.com/U79ZP0P5qck",
    url: "https://www.netflix.com/",
    description: "This is Netflix",
  },
  {
    name: "Netflix",
    img: "https://source.unsplash.com/wkb5BM3vlWY",
    url: "https://www.netflix.com/",
    description: "This is Netflix",
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
  "Developer Courses",
  "Image Processing",
  "DevTools",
  "Online Streaming",
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
