import mongoose from "mongoose"

export async function connectDb(){
    try {
        await mongoose.connect(process.env.MONGO_URL!)
        const connection = mongoose.connection
        connection.on("connected", (err)=>{
            console.log("Mongo DB is connected Error:", err);
        })

        connection.on("error", ()=>{
            console.log(" mongo DB Connection Failed");
            process.exit(1);
        })
        
    } catch (error) {
        console.log("Something Went wrong while connecting DB:");
        console.log(error);
    }
}