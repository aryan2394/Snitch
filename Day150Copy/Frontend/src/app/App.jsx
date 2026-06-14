import React from 'react'
import "./App.css"
import { RouterProvider } from 'react-router';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useAuth } from '../features/auth/hook/useAuth.js';
import router from './app.routes.jsx';
const App = () => {
  const user = useSelector(state => state.auth.user);
  const loading = useSelector(state => state.auth.loading);
  const { handleGetMe } = useAuth();

  useEffect(() => {
    handleGetMe();
  }, []);

   useEffect(() => {
     if (user) {
         if (user.role === "pending" && window.location.pathname !== "/choose-role") {
             window.location.pathname = "/choose-role";
         } else if (user.role !== "pending" && window.location.pathname === "/choose-role") {
             if (user.role === "seller") {
                 window.location.pathname = "/seller/dashboard";
             } else {
                 window.location.pathname = "/";
             }
         }
     }
   }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fbf9f6]">
        <div className="text-sm tracking-[0.25em] uppercase text-[#C9A96E]" style={{ fontFamily: "'Inter', sans-serif" }}>
          Loading Snitch...
        </div>
      </div>
    );
  }

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App
