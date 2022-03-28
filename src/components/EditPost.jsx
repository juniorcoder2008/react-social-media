/* eslint-disable no-restricted-globals */
import { onAuthStateChanged } from '@firebase/auth';
import { collection, doc, getDoc, setDoc, where, query, getDocs, updateDoc } from '@firebase/firestore';
import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { getDate } from '../getDate';

import Header from './Header';

const EditPost = ({ currentPostTitle, currentPostMessage, currentDocID, postMail, postUid, postUUID }) => {

  const [postTitle, setPostTitle] = useState(currentPostTitle);
  const [postTitleLength, setPostTitleLength] = useState(0);

  const [postMessage, setPostMessage] = useState(currentPostMessage);
  const [postMessageLength, setPostMessageLength] = useState(0);

  let userMail = '';

  onAuthStateChanged(auth, user => userMail = user.email)

  const changePost = async e => {
    e.preventDefault();

    let docID = ''

    getDocs(collection(db, 'posts')).then(info => {
      info.docs.forEach(item => {
        if (item.data().email === userMail) {
          docID = item.id;
        }
      })
      
      console.log(docID);

      updateDoc(doc(db, 'posts', docID), {
        postMessage: postMessage,
        postTitle: postTitle,
        date: getDate(),
      }, { merge: true }).then(() => {
        console.log('Post wurde geupdated');
        location.href = '/own-posts'
      }).catch(err => console.log(err));
    })

    
  }
  
  return (
    <div className='w-full h-full absolute top-0 left-0 bg-white'>
      <Header />
      <div className='px-20 mt-10'>
        <h1 className='text-3xl font-bold'>Edit Post: <span className='text-indigo-500'>{currentPostTitle}</span></h1>

        <form className='flex flex-col gap-4 mt-5' onSubmit={changePost}>
          <div className='flex gap-4 items-center'>
            <input maxLength={60} required value={postTitle} onChange={e => {setPostTitle(e.target.value); setPostTitleLength(e.target.value.length)}} type="text" placeholder='Name of the post' className='w-96 xl:w-1/3 bg-gray-200 rounded-md px-4 py-2 outline-none' />
            <p className='text-stone-500 font-mono'>{postTitleLength}/60</p>
          </div>
          <div className='flex gap-4'>
            <textarea maxLength={2000} value={postMessage} required onChange={e => {setPostMessage(e.target.value); setPostMessageLength(e.target.value.length)}} name="" id="" className='resize-none h-64 w-96 xl:w-1/3 bg-gray-200 px-4 py-3 outline-none rounded-md' placeholder='Content of the Post'></textarea>
            <p className='text-stone-500 font-mono mt-1'>{postMessageLength}/2000</p>
          </div>
          <button type="submit" className='w-64 bg-emerald-500 text-white py-2 font-medium rounded-md hover:bg-emerald-600 transition'>Change post content</button>
        </form>
      </div>
    </div>
  )
}

export default EditPost