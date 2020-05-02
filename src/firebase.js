import * as firebase from 'firebase/app';

// Add the Firebase products that you want to use
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "YOURS",
    authDomain: "YOURS",
    databaseURL: "YOURS",
    projectId: "YOURS",
    storageBucket: "YOURS",
    messagingSenderId: "YOURS",
    appId: "YOURS",
    measurementId: "YOURS"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();


export const getData = (col) => {

    console.log("Doing work")

    return db.collection(col)
        .get().then(snap => {
            return snap.docs.map(doc => doc)
        })
}
