import './App.css';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, createUserWithEmailAndPassword } from "firebase/auth";
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
  const [user, setUser] = useState({ isSignedIn: false, email: '', name: '', url: '', password: '' })
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
    signOut(auth).then(() => {
      // Sign-out successful.
      setUser(signOutUser)
    }).catch((error) => {
      // An error happened.
    });

  }

  const handelBlur = (event) => {
    // console.log(event.target.name+':', event.target.value);
    let isFormValid = true;
    if (event.target.name === 'name') {
      const isNameValid = /\S+/.test(event.target.value)
      //isFormValid=isNameValid;
    }
    if (event.target.name === 'email') {
      const isEmailValid = /\S+@\S+\.\S+/.test(event.target.value)
      isFormValid = isEmailValid;
    }
    if (event.target.name === 'password') {
      const isPasswordValid = event.target.value.length > 6;
      // const hasDigit =/\d{1}/.test(event.target.value); const hasString =/\$/.test(event.target.value);
      // const hasDigitStringSC =/^([a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,~.<>\/?]{6,})$/.test(event.target.value);
      isFormValid = isPasswordValid;
    }
    if (isFormValid) {
      const newUserInfo = { ...user }
      newUserInfo[event.target.name] = event.target.value
      setUser(newUserInfo)

    }
  }
  const handelSubmit = (e) => {

    console.log(user);
    if (user.name && user.email && user.password) {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, user.email, user.password)
        .then((userCredential) => {
          // Signed in 
          const user1 = userCredential.user;
          console.log(user1);
          const { email, displayName, photoURL } = user
          const signIndUser = {
            isSignedIn: true,
            name: displayName,
            email: email,
            url: photoURL
          }
          setUser(signIndUser)
          console.log(signIndUser);
          // ...
        })
        .catch((error) => {
          console.log(error);
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    }
    e.preventDefault();
  }
  return (
    <div className="App">

      {!user.isSignedIn ?
        <div>
          <button onClick={handelSignIn}>Continue With Google</button>
          <h2>Continue With Email</h2>
          <form onSubmit={handelSubmit}>
            <input type="text" name="name" id="name" placeholder='Name' onBlur={handelBlur} /><br />
            <input type="text" name="email" id="email" placeholder='Email' autoComplete='username' required onBlur={handelBlur} /><br />
            <input type="password" name="password" id="password" placeholder='Password' autoComplete='current-password' required onBlur={handelBlur} /><br />
            <input type="submit" value='Sign-In' />
          </form>
        </div> :
        <button onClick={handelSignOut}>Log-Out</button>}
        {  console.log(user)}
      {user.isSignedIn ?
      
        <div style={{ border: '2px solid blue', padding: '20px', margin: '20px 500px' }}>
          <h1>Welcome, {user.name}</h1>
          <img src={user.url} alt="" width='200px' />
          <h3>contact: {user.email}</h3>
          <h3>password: {user.password}</h3>
        </div> :
        <div></div>
      }


    </div>

  );
}


export default App;
