/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';

import Header from '../components/Header';
import CreatePost from '../components/CreatePost';
import Posts from '../components/Posts';

import { auth } from '../firebase';

import { onAuthStateChanged } from '@firebase/auth';

const home = () => {

  const [userInfo, setUserInfo] = useState('');

  onAuthStateChanged(auth, user => user ? setUserInfo(user) : '')

  return (
    <div>
      <Header />
      {userInfo !== '' ? <CreatePost /> : ''}
      <Posts />
    </div>
  )
}

export default home