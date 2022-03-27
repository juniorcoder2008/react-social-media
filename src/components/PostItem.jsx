import React, { useState } from 'react';

import { FaTrash } from 'react-icons/fa'

import Markdown from 'markdown-to-jsx';

import { auth } from '../firebase';

import { onAuthStateChanged } from '@firebase/auth';

const PostItem = ({ postTitle, postMessage, postAuthor }) => {

  const [userInfo, setUserInfo] = useState('');

  onAuthStateChanged(auth, user => {
    if(user) {
      setUserInfo(user)
    }
  });

  return (
    <div className='my-8 px-5 py-4 bg-gray-200 rounded-md w-1/2'>
      <div className="flex items-center justify-between">
        <h1 className='text-xl text-indigo-500 font-bold'>{postTitle} <span className='text-base text-stone-500 font-normal ml-2'>@{postAuthor}</span></h1>
        {userInfo !== '' ? <button><FaTrash /></button> : ''}
      </div>
      <div className="md"><Markdown className='mt-3'>{postMessage}</Markdown></div>
    </div>
  )
}

export default PostItem