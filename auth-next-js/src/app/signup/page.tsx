'use client'
import React, { useEffect, useState} from 'react'
import axios from 'axios';
import {toast} from 'react-hot-toast'
import { useRouter } from 'next/navigation';
import Link from 'next/link';


export default function SignupPage() {
  const router = useRouter()
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [buttonDisable, setButtonDisable] = useState(false)
  const [loading, setLoading] = useState(false);

  const onSignup = async ()=>{
    try {
      setLoading(true)
    const responce = await axios.post('/api/users/signup', user)
    console.log("signup success", responce.data);
    router.push('/login')


    } catch (error:any) {
      console.log("signup faild! try again")
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect( ()=>{
    if(user.email.length > 0 && user.password.length >0 && user.username.length >0){
      setButtonDisable(false)
    }else{
      setButtonDisable(true)
    }
  }, [user]);

  return (
    <div className='flex gap-5 flex-col  items-center text-white'>
      <h1>{loading? "Processing" : "Sign up"}</h1>
      <hr />
      <label htmlFor="username">Username</label>
      <input type="text"
       id='username' 
       className='text-black'
       placeholder='username'
       value={user.username} 
       onChange={(e)=>{setUser({...user, username:e.target.value})}}
        />

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
        onClick={onSignup}>
          {buttonDisable? "NO signup": "Signup"}
        </button>
        <Link href={'/login'}> Login
        </Link>
    </div>
  )
}