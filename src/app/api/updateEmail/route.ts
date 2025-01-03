import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Connection } from "@/helper/db  ";
import { Usermodel } from "@/models/Usermodel  ";

Connection();
export async function PUT(request:NextRequest){
    
     try {
        const {searchParams} = new URL(request.url)
        const userId = searchParams.get("userId")
 
        const reqbody = await request.json()
        const { newEmail} = reqbody
      const extisemail=await Usermodel.findOne({email:newEmail})
      if(extisemail || extisemail === ''){
        return NextResponse.json({message:"this email is already register"},{status:400})
      }

        const emailupdate = await Usermodel.findByIdAndUpdate(
            userId,
            {email: newEmail},
            {new :true},
        )
         if(emailupdate){
            
            return NextResponse.json({message:"This is the updated email",emailupdate},{status:200})
         }
        
     } catch (error) {
        console.log(error)
       
        return NextResponse.json({message:"Email id of user not update",error},{status:400})
        
     }

}