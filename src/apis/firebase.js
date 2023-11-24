import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyB9dP4TySMYxOjatvsHhpoOsAjzWY5CruM",
    authDomain: "clinicapweb-c4836.firebaseapp.com",
    projectId: "clinicapweb-c4836",
    storageBucket: "clinicapweb-c4836.appspot.com",
    messagingSenderId: "690832962107",
    appId: "1:690832962107:web:29ad46a358c7f435e5e21e",
    measurementId: "G-MDGFTXL626"
};

var auth = null;
const app = initializeApp(firebaseConfig);

if(app){
    auth = getAuth();
}

export default auth;
   