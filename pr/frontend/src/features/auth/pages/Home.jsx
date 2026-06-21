import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../hook/useAuth";
function Home()
{
    const user=useSelector((state)=>state.auth.user);
    const {handleGetMe}=useAuth();
    useEffect(()=>
    {
        handleGetMe();
    },[]) 
    console.log(user)
    return(
        <>
        </>
    )
}
export default Home;  