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
      url: '',
      error:''
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
      newUserInfo.error='';
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
          const { email, name, photoURL,password } = user
          const signIndUser = {
            isSignedIn: true,
            name: name,
            email: email,
            url: 'https://scontent.fdac24-2.fna.fbcdn.net/v/t1.6435-9/182163666_111029064475100_7524300687755693886_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=174925&_nc_eui2=AeG2IL4ualgmM_4ANNDwQAN5XnRYagEb0lBedFhqARvSUCmTA0LZS751uzQakWd5SBrGXeTfPrJt3bJcmHBMZ28Q&_nc_ohc=-7P-_zMexzEAX-5G1qI&_nc_ht=scontent.fdac24-2.fna&oh=00_AT9_C0utKeNdD4tKGiAZe-xeBlCfJcgF9BhAl6saiN3rTQ&oe=620DC02A',
            password:password
          }
          setUser(signIndUser)
          // ...
        })
        .catch((error) => { 
          const newUser={...user};
          newUser.error=error.message;
          setUser(newUser)
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
          <p style={{color:'red'}}>{user.error}</p>
        </div> :
        <button onClick={handelSignOut}>Log-Out</button>}
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
