import { connectDb } from "@/dbConnection/dbConfig"; 
import User from "@/models/user.model";
import { NextRequest, NextResponse } from 'next/server'


connectDb()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {token} = reqBody;
        console.log(token)

        const user = await User.findOne({verifyToken: token,
            verifyTokenExpiry: {$gt: Date.now()}})
            console.log(user)
        if(!user){
            return NextResponse.json({error: "Invalid token details"},{status: 400})
        }
        console.log("user hai ya nahi", user)

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save()

        return NextResponse.json({message: "User verified successfully"},{status: 200})

    } catch (error:any) {
        return NextResponse.json({error: "Not Verified"},{status: 500})
    }
}