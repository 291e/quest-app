import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAv9SjS2alDOTlNIQXbr9ndmF2QLGjsUG8",
  authDomain: "quest-app-754cb.firebaseapp.com",
  projectId: "quest-app-754cb",
  storageBucket: "quest-app-754cb.appspot.com",
  messagingSenderId: "753805625908",
  appId: "1:753805625908:web:16069b9568fca0c7875861"
};


// Firebase 앱을 초기화합니다.
const firebaseApp = initializeApp(firebaseConfig);

// Firebase 인증과 Firestore 인스턴스를 가져옵니다.
export const auth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);

export default firebaseApp;