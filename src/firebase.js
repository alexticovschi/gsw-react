import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/database';


// Initialize Firebase
const config = {
    apiKey: "AIzaSyDiI48En8NMieHupfxBD26p_kAIsdEThIc",
    authDomain: "gsw-react.firebaseapp.com",
    databaseURL: "https://gsw-react.firebaseio.com",
    projectId: "gsw-react",
    storageBucket: "gsw-react.appspot.com",
    messagingSenderId: "633947602241"
};

firebase.initializeApp(config);

const firebaseDB = firebase.database();

firebaseDB.ref('games').once('value').then((data)=>{
    console.log(data.val())
})