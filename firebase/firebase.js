import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCDquS057E_FBtkgsABXvwv1ipDqIwvgxA",
    authDomain: "food-delivery-2dc43.firebaseapp.com",
    databaseURL: "https://food-delivery-2dc43-default-rtdb.firebaseio.com",
    projectId: "food-delivery-2dc43",
    storageBucket: "food-delivery-2dc43.appspot.com",
    messagingSenderId: "318914988531",
    appId: "1:318914988531:web:b780824cf27fe167736a86",
    measurementId: "G-V5NXD2Z3MN"
};

firebase.initializeApp(firebaseConfig);

const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

export { projectAuth , projectStorage , firebaseConfig };