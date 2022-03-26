import React from 'react'

const Header = () => {
  return (
    <header className='flex bg-gray-50 px-20 border-2 py-4 justify-between items-center'>
      <h1 className='text-3xl font-bold'>React Social</h1>

      <button className='px-8 py-2 bg-blue-500 text-white rounded-md font-medium cursor-pointer hover:bg-blue-600 transition'>Login</button>
    </header>
  )
}

export default Header