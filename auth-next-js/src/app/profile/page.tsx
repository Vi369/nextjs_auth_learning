"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import {toast} from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'
export default function Profile() {

    const router = useRouter()
    const [data, setData] = useState("")

    const getUserDetails = async()=>{
        try {
            const res = await axios.post('/api/users/aboutme')
            console.log(res.data.data)
            setData(res.data.data._id)
        } catch (error:any) {
            console.log(error)
            toast.error("nothing found")
        }
    }

    const onLogout = async()=>{
        try {
            const res = await axios.get('/api/users/logout/')
            console.log(res)
            if(res.data.success){
                router.push('/login')
                toast.success("logout successfully!")
            }
            
        } catch (error:any) {
            console.log("logout error", error)
        }
    }
    
    return (
        <div className='flex flex-col items-center justify-center'>
            <h1>Profile Page</h1>
            <hr />
            <h2 className=''> {data ===""? "Nothing found": <Link href={`/profile/${data}>`}>click here {data}</Link>}</h2>
            <hr />
            <button className='p-2 bg-green-600 text-white'
            onClick={onLogout}>Logout
            </button>
            <button className='p-2 bg-blue-600 text-white'
            onClick={getUserDetails}>Get User Details 
            </button>
        </div>
    )
}