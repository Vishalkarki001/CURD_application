import { NextResponse } from "next/server";
import { Connection } from "@/helper/db  ";
import { Usermodel } from "@/models/Usermodel  ";
import { NextRequest } from "next/server";


Connection();
export async function DELETE(request:NextRequest,{params}:{params:{deleteid:string}}){
    try {
        const {deleteid}=params;
        console.log("user id of baceknd is ",deleteid)
        
        const deleteuser=await Usermodel.findByIdAndDelete(deleteid);
        if(!deleteuser){
            return NextResponse.json({message:"user not delete sucesfully"},{status:400})
        }
     return NextResponse.json({message:"the user is delete sucesfuuly"},
        {status:200}
     )

        
    } catch (error) {
         return NextResponse.json({ message: 'Something went wrong', error }, { status: 500 });
    }

}
