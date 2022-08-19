import {initializeApp} from 'firebase/app';
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut
} from 'firebase/auth';

import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA8UWCfU35me-WQ0vMVd07A-kd_R0ZdKLk",
    authDomain: "trung-react-typescript-app.firebaseapp.com",
    databaseURL: "https://trung-react-typescript-app-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "trung-react-typescript-app",
    storageBucket: "trung-react-typescript-app.appspot.com",
    messagingSenderId: "640945145374",
    appId: "1:640945145374:web:606366dd7ca43baff7d00f"
}

const app = initializeApp(firebaseConfig);

const auth =getAuth(app);

const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
    try {
        const response = await signInWithPopup(auth, googleProvider);   
        const user = response.user;
        const que = query(collection(db,"users"),where('uid',"==",user.uid));
        const docs = await getDocs(que);
        if(docs.docs.length === 0){
            await addDoc(collection(db,"users"),{
                uid:user.uid,
                name:user.displayName,
                authProvider:"google",
                email:user.email,
            }) 
        }
    } catch (error) {
        alert(error);
    }
}

const logInWithEmailAndPassword = async(email,password) => {
    try {
        await signInWithEmailAndPassword(auth,email,password);
    } catch (error) {
        alert(error.message);
    }
}

const registerWithEmailAndPassword = async (name, email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const logout = () => {
    signOut(auth);
  };

  export {
    app,
    auth,
    db, 
    logInWithEmailAndPassword,
    signInWithGoogle,
    logout,
    sendPasswordReset,
    registerWithEmailAndPassword
}