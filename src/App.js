import './App.css';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState } from 'react';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5925_wiTKrn9-7UM2QFX1Gvdg9bQYDQ0",
  authDomain: "ema-jhon-2022.firebaseapp.com",
  projectId: "ema-jhon-2022",
  storageBucket: "ema-jhon-2022.appspot.com",
  messagingSenderId: "1070815504848",
  appId: "1:1070815504848:web:6658bdcf39c2fdba03b1d5"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

function App() {
  const [user, setUser] = useState({ isSignedIn: false, email: '', name: '', url: '' })
  const handelSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        const { email, displayName, photoURL } = user
        const signIndUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          url: photoURL
        }
        setUser(signIndUser)
        console.log(user, credential);
        console.log(email, displayName, photoURL);
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
  const handelSignOut = () => {
    const signOutUser = {
      isSignedIn: false,
      name: '',
      email: '',
      url: ''
    }
    setUser(signOutUser)
  }
  return (
    <div className="App">

      {!user.isSignedIn ?
        <button onClick={handelSignIn}>SIGN-IN</button> :
        <button onClick={handelSignOut}>SIGN-OUT</button>}
      {user.isSignedIn ?

        <div style={{ border: '2px solid blue', padding: '20px', margin: '20px 500px' }}>
          <h1>Welcome To Google</h1>
          <h2>Name: {user.name}</h2>
          <h3>Email: {user.email}</h3>
          <img src={user.url} alt="" />
        </div> :
        <div><h1>LogIn to Explorer</h1></div>
      }

    </div>
  );
}

export default App;
