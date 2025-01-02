import { NextResponse } from "next/server";
import { Connection } from "@/helper/db  ";
import { Usermodel } from "@/models/Usermodel  ";
import { NextRequest } from "next/server";


Connection();

export  async function GET(request:NextRequest){

try{
    
    const users=await Usermodel.find({})
    return NextResponse.json({message:"all the user are find",users:users},{status:200})
    

} catch (error) {
    return NextResponse.json({message:"something went wrong",error})
    
}
}

   
