import React from 'react'
import { routes } from './app.routes'
import { RouterProvider } from 'react-router'
const App = () => {
  return (
    <>
    <RouterProvider router={routes}>
      <h1 className='text-red-500'>Shri ji</h1>
    </RouterProvider>
    </>
  )
}

export default App
