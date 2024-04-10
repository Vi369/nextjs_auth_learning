'use client'
import React from 'react'

export default function Daynamic({params}:any) {
  return (
    <div className='flex flex-col items-center justify-center'>
        <h1>Profile details</h1>
        <h2 className='bg-orange-400 text-white'>{params.dynamic}</h2>
    </div>
  )
}

// janha bhi ham [] se folder banye hai wanha ham use kar sakte hai params

