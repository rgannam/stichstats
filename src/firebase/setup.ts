import Vue from "vue";
import { firestorePlugin } from "vuefire";
import firebase from "firebase/app";
import "firebase/firestore";

Vue.use(firestorePlugin);

// Get a Firestore instance
export const db = firebase
  .initializeApp({ projectId: "stitchstats" })
  .firestore();
