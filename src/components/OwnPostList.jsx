/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import PostItem from './PostItem';

import { auth, db } from '../firebase';

import { collection, getDocs } from '@firebase/firestore';

import { onAuthStateChanged } from '@firebase/auth';

const OwnPostList = () => {

  const postsRef = collection(db, 'posts');

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        getDocs(postsRef).then(info => {
          info.docs.forEach(item => {
            if (item.data().email === user.email) {
              setPosts([...posts, item.data()]);
            }
          })
        })
      }
    })
  }, [])

  return (
    <div className='px-20 mt-10'>
      <h1 className='text-3xl font-bold'>Your own posts</h1>

      {posts.length !== 0 ? posts.map(postItem => {
        return <PostItem mainPage={true} postAuthor={postItem.username} postUser={postItem.uid} postID={postItem.id} postMessage={postItem.postMessage} postTitle={postItem.postTitle} />
      }) : <p className='mt-3 text-rose-500'>There are no posts on this platform</p>}
    </div>
  )
}

export default OwnPostList