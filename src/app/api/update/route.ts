import { NextResponse } from "next/server";
import { Connection } from "@/helper/db  ";
import { Usermodel } from "@/models/Usermodel  ";
import { NextRequest } from "next/server";


Connection();

export async function PUT(request:NextRequest){
       try{
        const {searchParams}=new URL(request.url)
        const userId=searchParams.get("userId")
        console.log(userId)
        const reqbody=await request.json()
        const {name,email,number}=reqbody
      

      
     
        const updatedUser = await Usermodel.findByIdAndUpdate(
          userId,
    
            { name, email, number },
            { new: true } 
          );
          if(updatedUser){
            return NextResponse.json({message:"this is the updated user"},{status:200})
          }
    }catch(error){
        return NextResponse.json({message:"error"},{status:404})

    }
}