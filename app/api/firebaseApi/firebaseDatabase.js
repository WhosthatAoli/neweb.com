import { getDatabase, ref, push, set, onValue } from "firebase/database";
import firebase_app from "./firebaseConfig";

const db = getDatabase(firebase_app);

// Function to save a marked website
export const saveMarkedWebsite = (userId, website) => {
  const markedWebsitesRef = ref(db, `users/${userId}/marked_websites`);
  const newWebsiteRef = push(markedWebsitesRef); // Generate a unique key
  return set(newWebsiteRef, website);
};

// Function to retrieve marked websites
export const retrieveMarkedWebsites = (userId, callback) => {
  const markedWebsitesRef = ref(db, `users/${userId}/marked_websites`);
  onValue(markedWebsitesRef, (snapshot) => {
    const markedWebsites = [];
    snapshot.forEach((childSnapshot) => {
      markedWebsites.push(childSnapshot.val());
    });
    callback(markedWebsites);
  });
};
