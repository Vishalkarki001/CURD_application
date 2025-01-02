

import { NextResponse } from "next/server";
import { Connection } from "@/helper/db  ";
import { Usermodel } from "@/models/Usermodel  ";
import { NextRequest } from "next/server";


Connection();


export async  function POST(request:NextRequest){
try {
 
    const reqbody=await request.json()
    const {name,email,number}=reqbody
    console.log(name ,email,number)
    if(!name || !email || !number){
        return NextResponse.json({message:"all fields are must required"},{status:404})
    }
    const ifexits=await Usermodel.findOne({email})
    if(ifexits){
        return NextResponse.json({
            error:"this email is already created"
        },{status:400})
    }
    const ifnumber=await Usermodel.findOne({number})
    if(ifnumber){
        return NextResponse.json({
            error:"this number is already created"
        },{status:400})
    }

    const user=await Usermodel.create({
        name,
        email,
        number
    })
  const saveduser=await user.save()
 

    return NextResponse.json({
        message:"user created sucesfully"
        ,saveduser
    },{status:200})

    
}catch (error) {

    console.error('Error occurred:', error);
    
    return NextResponse.json({ message: "Error occurred" }, { status: 400 });
}


}