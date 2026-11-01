import { Heading1 } from 'lucide-react'
import React from 'react'

import { Navigate } from 'react-router-dom'

const PrivateRoutes = ({children}) => {

    const token = localStorage.getItem("token")
    const user = JSON.parse(localStorage.getItem("user"))

    
    console.log(token)
    if (!token ) {
        return   <Navigate to = "/login" />
    }

    if (token && user.role==="ADMIN") {
    
  return (
    <>
  
   
    {children}
    </>
  )
    }

}

export default PrivateRoutes