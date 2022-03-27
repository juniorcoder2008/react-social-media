/* eslint-disable no-restricted-globals */
import React, { useState } from 'react';

import { collection, addDoc } from '@firebase/firestore';

import { auth, db } from '../firebase';

import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const Login = () => {

  const [authState, setAuthState] = useState(true);

  const [registerName, setRegisterName] = useState('');
  const [registerMail, setRegisterMail] = useState('');
  const [registerPass, setRegisterPass] = useState('');

  const [loginMail, setLoginMail] = useState('');
  const [loginPass, setLoginPass] = useState('');

  const login = e => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, loginMail, loginPass).then(() => location.href = '/');    
  }

  const register = async e => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, registerMail, registerPass).then(async () => {
      await addDoc(collection(db, 'users'), {
        email: registerMail,
        password: registerPass,
        name: registerName,
      }).then(() => location.href = '/');
    });
    
  }

  return (
    <div className='px-20'>
      {authState ? <div>
        <h1 className='text-3xl font-bold mt-10'>Login</h1>

        <form onSubmit={login} className='flex flex-col gap-3 mt-5'>
          <input onChange={e => setLoginMail(e.target.value)} value={loginMail} type="text" placeholder='E-Mail' className='px-4 py-2 bg-gray-200 lg:w-1/3 md:w-96 rounded-md' required />
          <input onChange={e => setLoginPass(e.target.value)} value={loginPass} type="password" placeholder='Password' className='px-4 py-2 bg-gray-200 lg:w-1/3 md:w-96 rounded-md' required />
          <p>Don't you have an account yet? Then <span className='text-indigo-500 underline cursor-pointer' onClick={() => setAuthState(false)}>register</span>!</p>
          <button type="submit" className='bg-emerald-500 w-32 py-2 rounded-md text-white font-medium mt-3 hover:bg-emerald-600 transition'>Login</button>
        </form>
      </div> : <div>
      <h1 className='text-3xl font-bold mt-10'>Register new Account</h1>

      <form onSubmit={register} className='flex flex-col gap-3 mt-5'>
        <input onChange={e => setRegisterName(e.target.value)} value={registerName} type="name" placeholder='Username' className='px-4 py-2 bg-gray-200 lg:w-1/3 md:w-96 rounded-md outline-none' required />
        <input onChange={e => setRegisterMail(e.target.value)} value={registerMail} type="email" placeholder='E-Mail' className='px-4 py-2 bg-gray-200 lg:w-1/3 md:w-96 rounded-md outline-none' required />
        <input onChange={e => setRegisterPass(e.target.value)} value={registerPass} minLength={6} type="password" placeholder='Password (min. 6 chars)' className='px-4 py-2 bg-gray-200 lg:w-1/3 md:w-96 rounded-md outline-none invalid:text-rose-500 valid:text-black' required />
        <p>Do you have an account yet? Then <span className='text-indigo-500 underline cursor-pointer' onClick={() => setAuthState(true)}>login</span>!</p>
        <button type="submit" className='bg-emerald-500 w-32 py-2 rounded-md text-white font-medium mt-3 hover:bg-emerald-600 transition'>Register</button>
      </form>
      </div> }
    </div>
  )
}

export default Login;