import { connectDb } from "@/dbConnection/dbConfig"; 
import { NextRequest, NextResponse } from 'next/server'
import User from '@/models/user.model'
import { getDataFromToken } from "@/helpers/getDataFromToken";

connectDb()

export async function POST(request:NextRequest) {
    const userId = await getDataFromToken(request)
    const userData = await User.findById(userId).select("-password");

    if(!userData){
        return NextResponse.json({error: "Invalid Token"}, {status: 400})
    }

    return NextResponse.json({
        message: "User Related data",
        data: userData
    })

} 

