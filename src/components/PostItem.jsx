/* eslint-disable eqeqeq */
/* eslint-disable no-restricted-globals */
import React, { useState } from 'react';

import { FaTrash, FaEdit } from 'react-icons/fa';

import Markdown from 'markdown-to-jsx';

import { auth, db } from '../firebase';

import { onAuthStateChanged } from '@firebase/auth';
import { collection, deleteDoc, doc, getDocs } from '@firebase/firestore';
import EditPost from './EditPost';

const PostItem = ({ postTitle, postMessage, postAuthor, postID, postUser, postUUID, postTime, mainPage }) => {

  const [userInfo, setUserInfo] = useState('');
  const [userData, setUserData] = useState('');

  const [editPost, setEditPost] = useState(false);

  const [showLoading, setShowLoading] = useState(false);

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
      });
    }
  });

  const deleteMessage = async () => {
    console.log(postID)
    setShowLoading(true);
    await deleteDoc(doc(db, "posts", postID)).then(setShowLoading(false));
  }

  const editMessage = async () => {
    setEditPost(!editPost);
  }

  console.log(mainPage)

  return (
    <div className='my-8 px-5 py-4 bg-gray-100 rounded-xl w-1/2'>
      {editPost ? <EditPost currentPostTitle={postTitle} currentPostMessage={postMessage} currentDocID={postID} postMail={userInfo.email} postUUID={postUUID} postUid={userInfo.uid} /> : ''}
      <div className="flex items-center justify-between">
        <h1 className='text-xl text-indigo-500 font-bold'>{postTitle} <span className='text-base text-stone-500 font-normal ml-2'>@{postAuthor === userData.name ? `${postAuthor} (You)` : postAuthor} - {postTime}</span></h1>
        {userInfo.uid === postUser ? <div className='flex gap-4'>
          {showLoading ? <p className='text-rose-500'>Deleting post...</p> : ''}
          <button onClick={deleteMessage}><FaTrash color='rgb(244, 63, 94)' /></button>
          {mainPage == undefined ? '' : <button onClick={editMessage}><FaEdit color='rgb(30, 30, 30)' /></button>}
        </div> : ''}
      </div>
      <div className="md"><Markdown className='mt-3'>{postMessage}</Markdown></div>
    </div>
  )
}

export default PostItem