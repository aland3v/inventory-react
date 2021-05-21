import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDjrCiQF43OMjkG-kwnLrI_8eel6LvqHcY',
  authDomain: 'saludybelleza-a3ee3.firebaseapp.com',
  databaseURL: 'https://saludybelleza-a3ee3.firebaseio.com',
  projectId: 'saludybelleza-a3ee3',
  storageBucket: 'saludybelleza-a3ee3.appspot.com',
  messagingSenderId: '133715195865',
  appId: '1:133715195865:web:cd092d7e6d147a29910bc8',
  measurementId: 'G-LE4M5RJ2RW',
};

firebase.initializeApp(firebaseConfig);

const projectAuth = firebase.auth();
const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
export { projectAuth, projectStorage, projectFirestore, timestamp };
