import { connectDb } from "@/dbConnection/dbConfig"; 
import User from "@/models/user.model";
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import { sendEmail } from '@/helpers/mailer'

connectDb()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody;
        // TODO: validation 
        console.log(reqBody)

        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({error: "User already exist"}, {status: 400})
        }

        const salt = await bcryptjs.genSalt(10);

        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const saveUser = await newUser.save()

        console.log("saved user",saveUser)

        // send verification email 

        await sendEmail({email, emailType: "VERIFY", userId: saveUser._id})

        // saveUser.password = undefined;
        return NextResponse.json({
            message: "User Registred successfully",
            success: true,
            saveUser
        })
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        },
        {
            status: 500
        })
    }
}