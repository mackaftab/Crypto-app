import firebaseConfig from "./Config/firebaseConfig";
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore"


// import "firebase/compat/auth";
// import "firebase/compat/firestore";


const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);


export {auth,db};











