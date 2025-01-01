import mongoose from "mongoose"
export const Connection=async()=>{

    try {
        await mongoose.connect(process.env.MONGO_URL!)
        const connection=mongoose.connection;
        connection.on('connected',()=>{
            console.log("mongodb is connected")
        })
        connection.on('error',(err)=>{
            console.log("erro in databse is not conncted",err)
            process.exit()
        })
        
    } catch (error) {
        console.log("databse is not connected")
        console.log(error)
        
    }

}