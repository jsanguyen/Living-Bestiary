import * as firebase from 'firebase/app';

// Add the Firebase products that you want to use
import 'firebase/firestore';

// const firebaseConfig = {
//     apiKey: "YOURS",
//     authDomain: "YOURS",
//     databaseURL: "YOURS",
//     projectId: "YOURS",
//     storageBucket: "YOURS",
//     messagingSenderId: "YOURS",
//     appId: "YOURS",
//     measurementId: "YOURS"
// };

const firebaseConfig = {
    apiKey: "AIzaSyCV9KfwbzwDzs3SQYt1hMxgI0xVSXabCZc",
    authDomain: "living-bestiary-ad674.firebaseapp.com",
    databaseURL: "https://living-bestiary-ad674.firebaseio.com",
    projectId: "living-bestiary-ad674",
    storageBucket: "living-bestiary-ad674.appspot.com",
    messagingSenderId: "701445157334",
    appId: "1:701445157334:web:62519179dcff8a6011b477",
    measurementId: "G-R5T1YLE3PB"
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

export const getDoc = (col, info) =>{

    console.log('Doing Work')

    let docRef = db.collection(col).doc(info);

    let getDoc = docRef.get()
        .then(doc => {
            if (!doc.exists) {
                console.log('No such document!');
            } else {
               return(doc.data())
            }
        })
        .catch(err => {
            console.log(err);
        })

    return(
        getDoc
    )
}
