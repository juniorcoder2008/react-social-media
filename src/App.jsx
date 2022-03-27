import React, { useState } from 'react';

import Header from './components/Header';
import CreatePost from './components/CreatePost';
import Posts from './components/Posts';

import { onAuthStateChanged } from 'firebase/auth';

import { auth } from './firebase';

const App = () => {

  const [loginState, setLoginState] = useState(false);

  // const [userInfo, setUserInfo] = useState();

  onAuthStateChanged(auth, user => {
    if(user) {
      setLoginState(true);
    } else {
      setLoginState(false);
    }
  });

  return (
    <div>
      <Header />
      {loginState ? <CreatePost /> : ''}
      <Posts />
    </div>
  )
}

export default App