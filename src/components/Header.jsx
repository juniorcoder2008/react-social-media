/* eslint-disable no-restricted-globals */
import React, { useState } from 'react';

import { auth, db } from '../firebase';

import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query, where } from '@firebase/firestore';

import { FaEllipsisV } from 'react-icons/fa'

const Header = () => {

  const provider = new GoogleAuthProvider();

  const [showUserSettings, setShowUserSettings] = useState(false);

  const login = () => {
    signInWithPopup(auth, provider);
  }

  const logout = () => {
    signOut(auth).then(() => location.reload());
  }

  const [loginState, setLoginState] = useState(false);

  const [userInfo, setUserInfo] = useState();
  const [userName, setUserName] = useState();

  onAuthStateChanged(auth, async user => {
    if(user) {
      const q = query(collection(db, 'users'), where('email', '==', user.email));

      await getDocs(q).then(info => {
        info.docs.forEach(item => {
          setUserName(item.data().name);
        })
      });

      setUserInfo(user);
      setLoginState(true);

    } else {
      setShowUserSettings(false)
      setLoginState(false);
    }
  });

  return (
    <header className='relative flex bg-gray-50 px-20 border-b-2 py-4 justify-between items-center'>
      <h1 className='text-3xl font-bold'><a href="/">React Social</a></h1>

      {!loginState ? 
        <button onClick={login} className='px-6 py-2 flex gap-3 bg-blue-500 text-white rounded-md font-medium cursor-pointer hover:bg-blue-600 relative transition'><a href="/login">Login</a></button> 
        : <div className='flex items-center gap-5'>
          <p>{userName}</p>
          <button onClick={() => setShowUserSettings(!showUserSettings)}><FaEllipsisV /></button>

          {showUserSettings ? <div className='flex flex-col gap-3 absolute right-20 py-4 px-5 -bottom-32 rounded-md bg-gray-200'>
            <a href="/own-posts" className='underline'>Show own posts</a>
            <button onClick={logout} className='px-8 py-2 bg-rose-500 text-white rounded-md font-medium cursor-pointer hover:bg-rose-600 transition'>Logout</button>
          </div> : ''}
        </div>}
      
    </header>
  )
}

export default Header;