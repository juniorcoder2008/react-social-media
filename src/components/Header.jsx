import React, { useState } from 'react';

import { auth } from '../firebase';

import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

import GoogleIcon from '../icons/GoogleIcon';

const Header = () => {

  const provider = new GoogleAuthProvider();

  const login = () => {
    signInWithPopup(auth, provider);
  }

  const logout = () => {
    signOut(auth);
  }

  const [loginState, setLoginState] = useState(false);

  const [userInfo, setUserInfo] = useState();

  onAuthStateChanged(auth, (user) => {
    if(user) {
      console.log('Hello, ' + user.displayName);
      setUserInfo(user);
      setLoginState(true)
    } else {
      setLoginState(false);
    }
  })

  return (
    <header className='flex bg-gray-50 px-20 border-b-2 py-4 justify-between items-center'>
      <h1 className='text-3xl font-bold'>React Social</h1>

      {!loginState ? 
        <button onClick={login} className='px-6 py-2 flex gap-3 bg-blue-500 text-white rounded-md font-medium cursor-pointer hover:bg-blue-600 relative transition'>Login with<GoogleIcon /></button> 
        : <div className='flex items-center gap-10'>
          <p>Hello, <span className='font-bold'>{userInfo.displayName}</span></p>
          <button onClick={logout} className='px-8 py-2 bg-rose-500 text-white rounded-md font-medium cursor-pointer hover:bg-rose-600 transition'>Logout</button>
        </div>}
      
    </header>
  )
}

export default Header;