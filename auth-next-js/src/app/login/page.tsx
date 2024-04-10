"use client"
import React, { useEffect, useState} from 'react'
import axios from 'axios';
import {toast} from 'react-hot-toast'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
export default function LoginPage() {
  const router = useRouter()
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const [buttonDisable, setButtonDisable] = useState(false)
  const [loading, setLoading] = useState(false);

  const onLogin = async ()=>{
    try {
      setLoading(true)
    const responce = await axios.post('/api/users/login', user)
    console.log("Login success", responce.data);
    router.push('/profile')


    } catch (error:any) {
      console.log("Login faild! try again")
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect( ()=>{
    if(user.email.length > 0 && user.password.length >0){
      setButtonDisable(false)
    }else{
      setButtonDisable(true)
    }
  }, [user]);

  return (
    <div className='flex gap-5 flex-col  items-center text-white'>
      <h1>{loading? "Processing" : "Login"}</h1>
      <hr />
        {/* email */}
        <label htmlFor="email">Email</label>
        <input type="email"
          id='email' 
          placeholder='email'
          className='text-black'
          value={user.email} 
          onChange={(e)=>{setUser({...user, email:e.target.value})}}
        />

        {/* password */}
        <label htmlFor="Password">Password</label>
        <input type="password"
          id='Password' 
          placeholder='Password'
          className='text-black'
          value={user.password} 
          onChange={(e)=>{setUser({...user, password:e.target.value})}}
        />

        <button className='border p-5 max-w-[500px]'
        onClick={onLogin}>
          {buttonDisable? "NO Login": "Login"}
        </button>
        <Link href={'/signup'}> Signup
        </Link>
    </div>
  )
}