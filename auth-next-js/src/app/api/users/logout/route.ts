import { connectDb } from "@/dbConnection/dbConfig"; 
import { NextRequest, NextResponse } from 'next/server'

connectDb()


export async function GET(request: NextRequest) {
    try {
        const responce = NextResponse.json({
            message: "Logout successfully",
            success: true
        })

        responce.cookies.set("token","", {
            httpOnly: true,
            expires: new Date(0)
        },)
        return NextResponse.json({message: "User logout successfully",
            success: true
        },{status: 200})
    } catch (error:any) {
        return NextResponse.json({error: error.message},{status: 500})
    }
}