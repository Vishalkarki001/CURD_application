import { NextResponse } from "next/server";
import { Connection } from "@/helper/db  ";
import { Usermodel } from "@/models/Usermodel  ";
import { NextRequest } from "next/server";


Connection();


export async function GET(request:NextRequest){
    const {searchParams}=new URL(request.url)
    const userId=searchParams.get("userId")
   
    
  
    const findid = await Usermodel.findById(userId)
   
    
    
    if(!findid){
        return NextResponse.json({message:"user id not found"},{status:400})
    }
     return NextResponse.json({message:"user id ",findid},{status:200})
    

}