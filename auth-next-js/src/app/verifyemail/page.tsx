'use client'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Link from 'next/link'

export default function page() {

    // const router = useRouter()

    const[token, setToken]= useState("")
    const[verified, setVerified]= useState(false)
    const[error, setError]= useState(false)

    const verifiedEmail = async()=>{
        try {
            console.log(token)
            const respone = await axios.post('/api/users/verifyemail',{token})
            setVerified(true)
            toast.success("User verified successfully")
            console.log(respone)
            return respone.data
        } catch (error:any) {
            setError(true)
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        const windowUrlToken = window.location.search.split("=")[1]
        setToken(windowUrlToken || "")
        console.log(windowUrlToken)
        // const {query} = router;
        // const urlToken = query.token;
        // console.log("url Token",urlToken)
        
    },[])
    return (
    <div className='flex flex-col items-center'> 
    <h1 className='text-4xl'>Verify Email</h1>
    {/* <h2 className='p-2 bg-orange-700 text-black'></h2> */}

    <button className='p-5 text-white bg-blue-500'
    onClick={verifiedEmail}>
        Verify email
    </button>
    {/* verified */}
    {verified && (<div>
        <h2 className='text-green-600'>Verified</h2>
        <Link href = "/login">Login</Link>
    </div>)}
    {/* error */}
    {error && (<div>
        <h2 className='text-red-600'>Error</h2>
    </div>)}
    </div>
    )
}
