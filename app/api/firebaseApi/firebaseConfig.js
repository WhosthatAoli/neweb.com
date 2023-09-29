import { initializeApp, getApps } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBBPjxJZ6tYQN8WRWL8rXucKtX8vdyxORo",
    authDomain: "content-aggregator-website.firebaseapp.com",
    databaseURL: "https://content-aggregator-website-default-rtdb.firebaseio.com",
    projectId: "content-aggregator-website",
    storageBucket: "content-aggregator-website.appspot.com",
    messagingSenderId: "916651411794",
    appId: "1:916651411794:web:9640ab096f22ea3698528b",
    measurementId: "G-67VNQ5FRFT"
};
let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default firebase_app;