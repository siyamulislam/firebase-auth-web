import './App.css';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider  } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5925_wiTKrn9-7UM2QFX1Gvdg9bQYDQ0",
  authDomain: "ema-jhon-2022.firebaseapp.com",
  projectId: "ema-jhon-2022",
  storageBucket: "ema-jhon-2022.appspot.com",
  messagingSenderId: "1070815504848",
  appId: "1:1070815504848:web:6658bdcf39c2fdba03b1d5"
};
const app= initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new  GoogleAuthProvider();

function App() {
  // const createUser=(email,password)=>{
  //   createUserWithEmailAndPassword(auth, email, password)
  //   .then((userCredential) => {
  //     // Signed in 
  //     const user = userCredential.user;
  //     // ...
  //   })
  //   .catch((error) => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     // ..
  //   });
  // }
  const handelSignIn= ()=>{
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    const {email,displayName,photoURL}=user
    console.log(user,credential);
    console.log(email,displayName,photoURL);
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });

  }
  return (
    <div className="App"> 

    <h1>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem corporis illo enim consequuntur aspernatur repudiandae. Explicabo, ab. Aspernatur, quos qui!</h1>
    <button onClick={handelSignIn}>SIGN-IN</button>
    </div>
  );
}

export default App;
