import { connectDb } from "@/dbConnection/dbConfig"; 
import User from "@/models/user.model";
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
connectDb()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {email, password} = reqBody;

        // TODO: validation 
        console.log(reqBody)

        const user = await User.findOne({email
        })

        if(!user){
            return NextResponse.json({error: "User does not exits"},{status: 400})
        }

        console.log("user exits")

        const validPassword = await bcryptjs.compare(password, user.password)

        if(!validPassword){
            return NextResponse.json({error: "Password not valid"},{status: 500})
        }

        const tokenData = {
            id: user._id,
            username:user.username,
            email: user.email 
        }

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECERET!, { expiresIn: '1h' })

    const response = await NextResponse.json({
        message: "logged in successful",
        success: true
    })

    response.cookies.set("token", token, {
        httpOnly: true
    })

    return response
    
    } catch (error:any) {
        return NextResponse.json({error: "Not Verified"},{status: 500})
    }
}
