import React, { useState } from 'react';

import { FaTrash } from 'react-icons/fa';

import Markdown from 'markdown-to-jsx';

import { auth, db } from '../firebase';

import { onAuthStateChanged } from '@firebase/auth';
import { collection, deleteDoc, doc, getDocs } from '@firebase/firestore';

const PostItem = ({ postTitle, postMessage, postAuthor, postID, postUser }) => {

  const [userInfo, setUserInfo] = useState('');
  const [userData, setUserData] = useState('');

  onAuthStateChanged(auth, user => {
    if(user) {
      setUserInfo(user);

      getDocs(collection(db, 'users')).then(info => {
        info.docs.forEach(item => {
          setUserData({
            name: item.data().name,
            pass: item.data().password,
            uid: item.data().uid
          })
        })
      })
    }
  });

  const deleteMessage = async () => {
    await deleteDoc(doc(db, "posts", postID));
  }

  return (
    <div className='my-8 px-5 py-4 bg-gray-100 rounded-xl w-1/2'>
      <div className="flex items-center justify-between">
        <h1 className='text-xl text-indigo-500 font-bold'>{postTitle} <span className='text-base text-stone-500 font-normal ml-2'>@{postAuthor}</span></h1>
        {userData.uid === postUser ? <button onClick={deleteMessage}><FaTrash color='rgb(244, 63, 94)' /></button> : ''}
      </div>
      <div className="md"><Markdown className='mt-3'>{postMessage}</Markdown></div>
    </div>
  )
}

export default PostItem