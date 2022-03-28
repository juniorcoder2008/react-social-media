import React, { useState } from 'react';

import { db } from '../firebase';

import { collection, getDocs } from '@firebase/firestore';
import PostItem from './PostItem';

const Posts = () => {

  const postsRef = collection(db, 'posts');

  const [posts, setPosts] = useState([]);

  getDocs(postsRef).then(documents => {
    setPosts(documents.docs);
  });

  return (
    <div className='px-20 mt-10'>
      <h1 className='text-3xl font-bold'>New Posts</h1>

      {posts.length !== 0 ? posts.map(postItem => {
        return <PostItem postAuthor={postItem.data().username} postUser={postItem.data().uid} postID={postItem.id} postMessage={postItem.data().postMessage} postTitle={postItem.data().postTitle} postUUID={postItem.data().uuid} />
      }) : <p className='mt-3 text-rose-500'>There are no posts on this platform</p>}
    </div>
  )
}

export default Posts