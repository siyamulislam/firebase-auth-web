import './App.css';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile   } from "firebase/auth";
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
  const [user, setUser] = useState({ isSignedIn: false, email: '', name: '', url: '', password:'',newUser:false })
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
          url: photoURL,
        }
        setUser(signIndUser)
        // ...
      }).catch((error) => {
        console.log(error);
      });
  }
  const handelSignOut = () => {
    const signOutUser = {
      isSignedIn: false,
      name: '',
      email: '',
      url: '',
      error: '',
      isSuccess: false
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
      newUserInfo.error = '';
      setUser(newUserInfo)
    }
  }
  const handelSubmit = (e) => {

    console.log(user);
    if (user.newUser&& user.name && user.email && user.password) {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, user.email, user.password)
        .then((userCredential) => {
          // Signed in 
          const user1 = userCredential.user;
          const { email, name, photoURL, password } = user;
          const signIndUser = {
            isSignedIn: true,
            name: name,
            email: email,
            url: 'https://scontent.fdac24-2.fna.fbcdn.net/v/t1.6435-9/182163666_111029064475100_7524300687755693886_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=174925&_nc_eui2=AeG2IL4ualgmM_4ANNDwQAN5XnRYagEb0lBedFhqARvSUCmTA0LZS751uzQakWd5SBrGXeTfPrJt3bJcmHBMZ28Q&_nc_ohc=-7P-_zMexzEAX-5G1qI&_nc_ht=scontent.fdac24-2.fna&oh=00_AT9_C0utKeNdD4tKGiAZe-xeBlCfJcgF9BhAl6saiN3rTQ&oe=620DC02A',
            password: password,
            isSuccess: true
          }
          setUser(signIndUser);
          UpdateUserName(name)  ;
          console.log('signnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn',userCredential.user);        // ...
        })
        .catch((error) => {
         const newUser = { ...user };
          newUser.error = error.message;
          setUser(newUser) ;
          // ..
        });
    }

    if(!user.newUser&& user.email&&user.password){
      signInWithEmailAndPassword(auth, user.email, user.password)
.then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        const { email, name, photoURL, password } = user;
        const signIndUser = {
          isSignedIn: true,
          name: name,
          email: email,
          url: 'https://scontent.fdac24-2.fna.fbcdn.net/v/t1.6435-9/182163666_111029064475100_7524300687755693886_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=174925&_nc_eui2=AeG2IL4ualgmM_4ANNDwQAN5XnRYagEb0lBedFhqARvSUCmTA0LZS751uzQakWd5SBrGXeTfPrJt3bJcmHBMZ28Q&_nc_ohc=-7P-_zMexzEAX-5G1qI&_nc_ht=scontent.fdac24-2.fna&oh=00_AT9_C0utKeNdD4tKGiAZe-xeBlCfJcgF9BhAl6saiN3rTQ&oe=620DC02A',
          password: password,
          isSuccess: true,
        }
        setUser(signIndUser)
        // ...
      })
      .catch((error) => {
        const newUser = { ...user };
          newUser.error = error.message;
          setUser(newUser) 
      });
    }
    e.preventDefault();
  }

  const UpdateUserName= name=> {
    updateProfile(auth.currentUser, {
      displayName:name,
      //  photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then(() => {
      // Profile updated!
      // ...
    }).catch((error) => {
      // An error occurred
      // ...
    });
    
  }
  return (
    <div className="App">
      {!user.isSignedIn ?
        <div>
          <button onClick={handelSignIn}>Continue With Google</button>
          <button>SignIn With FaceBook</button>
          <h3>Continue With Email</h3>
          <input type="checkbox" name="checkUser" id="checkUser"onChange={()=> { 
            //way 1
            // let ckUser=true
            // !user.newUser?  ckUser=true: ckUser=false
            //  const newUserStatus = {newUser:ckUser}
            // setUser(newUserStatus)

            //way 2
            // const newUserStatus = {newUser:!user.newUser?  true:false}
            // setUser(newUserStatus)

            //way 3
            setUser({newUser:!user.newUser})
            
            }} />
          <label htmlFor="checkUser">New User?</label>
      
            
          <form onSubmit={handelSubmit}>
           {user.newUser && <div> <input type="text" name="name" id="name" placeholder='Name' onBlur={handelBlur} /><br /></div>}
            <input type="text" name="email" id="email" placeholder='Email' autoComplete='username' required onBlur={handelBlur} /><br />
            <input type="password" name="password" id="password" placeholder='Password' autoComplete='current-password' required onBlur={handelBlur} /><br />
            <input type="submit" value= { user.newUser? "Sign Up":"Sign In"} />
          </form>

          <p style={{ color: 'red' }}>{user.error}</p>
        </div> :
        <div>
          {<p style={{ color: 'green' }}>User Created Successfully !</p>}
          <button onClick={handelSignOut}>Log-Out</button>
        </div>}

      {user.isSignedIn ?
        <div style={{ border: '2px solid blue', padding: '20px', margin: '20px 500px' }}>
          <h1>Welcome, {user.name}</h1>
          <img src={user.url} alt="" width='50px' />
          <h3>contact: {user.email}</h3>
          <h3>password: {user.password}</h3>
        </div> :
        <div></div>
      }
    </div>
  );
}

export default App;
