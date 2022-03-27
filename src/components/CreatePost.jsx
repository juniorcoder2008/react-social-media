import React, { useState } from 'react';

import { onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc } from '@firebase/firestore';


import { auth, db } from '../firebase';

import { v4 } from 'uuid';

const CreatePost = () => {
  
  const postRef = collection(db, 'posts');

  const [userInfo, setUserInfo] = useState();

  const [postTitle, setPostTitle] = useState('');
  const [postMessage, setPostMessage] = useState('');

  onAuthStateChanged(auth, (user) => {
    if(user) {
      setUserInfo(user);
    }
  });
  
  let post = {
    uuid: v4(),
    postTitle: '',
    postMessage: '',
  }

  const sendPost = async (e) => {
    e.preventDefault();
    post["username"] = userInfo.displayName;
    post["email"] = userInfo.email;
    post["postTitle"] = postTitle;
    post["postMessage"] = postMessage;

    addDoc(postRef, post);

    post = {
      uuid: v4(),
      postTitle: '',
      postMessage: '',
    }

    setPostTitle('');
    setPostMessage('');
  }

  return (
    <div className='px-20 pt-10 mb-16'>
      <h1 className='text-3xl font-bold'>Create a new Post</h1>

      <form onSubmit={sendPost} className='flex flex-col gap-4 mt-5'>
        <input value={postTitle} onChange={e => setPostTitle(e.target.value)} type="text" placeholder='Name of the post' className='w-96 xl:w-1/3 bg-gray-200 rounded-md px-4 py-2 outline-none' />
        <textarea value={postMessage} onChange={e => setPostMessage(e.target.value)} name="" id="" className='resize-none h-64 w-96 xl:w-1/3 bg-gray-200 px-4 py-3 outline-none rounded-md' placeholder='Content of the Post'></textarea>
        <button type="submit" className='w-52 bg-emerald-500 text-white py-2 font-medium rounded-md hover:bg-emerald-600 transition'>Send Post</button>
      </form>
    </div>
  )
}

export default CreatePost