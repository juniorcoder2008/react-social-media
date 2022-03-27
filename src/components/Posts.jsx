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

      {posts.map(postItem => {
        return <PostItem postAuthor={postItem.data().username} postMessage={postItem.data().postMessage} postTitle={postItem.data().postTitle} />
      })}
    </div>
  )
}

export default Posts