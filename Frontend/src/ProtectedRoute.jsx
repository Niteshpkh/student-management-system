import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
        const IsLoggedIn = localStorage.getItem("IsLoggedIn");
        if(IsLoggedIn == "true"){
           return <Outlet/>
        }
        else {
            return <Navigate to= '/'/>
        }
    }

export default ProtectedRoute