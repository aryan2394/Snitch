import React, { useEffect } from "react";
import "./App.css";
import { RouterProvider } from "react-router";
import { useSelector } from "react-redux";
import { useAuth } from "../features/auth/hooks/useAuth";
import { routes } from "./app.routes";

function App()
{
  const { checkAuth } = useAuth();
  const user = useSelector(state => state.auth.user);
  const loading = useSelector(state => state.auth.loading);

  useEffect(() => {
      checkAuth();
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
      <RouterProvider router={routes} />
    </>
  );
}

export default App; 