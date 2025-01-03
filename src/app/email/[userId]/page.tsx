"use client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

function page() {
  
     const params = useParams(); 
        console.log("Params:", params); 
      
        const userId = params?.userId;
        console.log("User ID:", userId);
      
    
    const [error,setError]=useState<string | null>(null)
    const [validation,setValidation]=useState<string | null>(null)
  
    const [formData ,setFormData]=useState({
        email:"",
        newEmail:"",
    })
     const router = useRouter()
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

      useEffect(()=>{
    const fetchData =async ()=>{
        try{
        const response=await axios.get(`/api/users?userId=${userId}`)
        setFormData({
            email: response.data.findid.email || "",
            newEmail:''
        })
    }catch(error){
        console.log(error)
    }
}

        fetchData();

      },[userId])
      
    
      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData)
        setError(null);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(formData.newEmail)){
          setValidation("Please enter the correct email")
          return ;
        }

      
      try {
        const response= await axios.put(`/api/updateEmail/?userId=${userId}`,formData)
        console.log("update email",response.data)
        router.push("/profile")

        
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const backendData = error.response?.data;
          setError(JSON.stringify(backendData) || "An unexpected error occurred");
          console.log(error);
        } else {
          setError("An unexpected error");
        }
      }
    }


  return (
  <>

    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h1 className="text-2xl font-bold text-center mb-6">User Registration</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
       
          
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
           Previous Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            readOnly
            value={formData.email}
            
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>


        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="newEmail"
            name="newEmail"
            value={formData.newEmail}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        

        <div>
          <button
            type="submit"
            className=" py-2 mb-4  p-2 px-10 block bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Update
          </button>
          <Link
           className="text-xl p-2 bg-green-400 rounded-lg  text-white mt-4"
           href="/profile">
            Go To Profile
          </Link>
        
          { <p className=" text-center text-xl text-red-500 mt-4">{validation}</p>}
        </div>
      </form>

      {error && <p className="text-center text-red-500 text-xl mt-4">{error}</p>}
    </div>
  
  </>
  )
}

export default page