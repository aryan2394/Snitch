import React from 'react'
import "./App.css"
import { RouterProvider } from 'react-router';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useAuth } from '../features/auth/hook/useAuth.js';
import router from './app.routes.jsx';
const App = () => {
  const user=useSelector(state=>state.auth.user);
  const {handleGetMe}=useAuth();
  useEffect(()=>
  {
    handleGetMe();
  },[])
  
  console.log(user); 
  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
