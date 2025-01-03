"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import Link from "next/link";

const EditProfile = () => {
    const params = useParams(); 
    console.log("Params:", params); 
  
    const userId = params?.userId;
    console.log("User ID:", userId);

  const [formData, setFormData] = useState({
    name: "",
    number: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const[validation,setValidation]=useState<string|null>(null)
  const router = useRouter();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/users?userId=${userId}`);
        
        setFormData({
          name: response.data.findid.name || "",
          number: response.data.findid.number || "",
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to fetch user data.");
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
  

    if (!/^\d{10}$/.test(formData.number)) {
      setValidation("Phone number must be exactly 10 digits.");
      return;
    }

    try {
      const response = await axios.put(`/api/update/?userId=${userId}`, formData);
    
      console.log("User updated successfully:", response.data);
      
      router.push(`/profile`);
    } catch (err) {
      console.error("Error updating user:", err);
      setError("Failed to update profile.");
    }
  };

  if (loading) {
    return <div className="text-center mt-6">Loading...</div>;
  }

  return (
    <div className = "w-full min-h-screen bg-gray-100 p-8">
      <div className = "max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className = "text-2xl font-bold text-center text-gray-700 mb-6">Edit Profile</h2>

        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit = {handleSubmit} className = "space-y-4">
          <div>
            <label htmlFor = "name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type = "text"
              id = "name"
              name = "name"
              value = {formData.name}
              onChange = {handleChange}
              className = "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

       

          <div>
            <label htmlFor = "number" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              id="number"
              name="number"
              
              value = {formData.number}
              onChange = {handleChange}
              className = " mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <button
              type = "submit"
              className = " mb-4 px-8 block text-center  py-2  bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Update
            </button>
            <Link
              href ={`/email/${userId}`}
              className = "mt-4 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Update Email
            </Link>
            <p className="mt-4 text-red-500 text-xl">{validation}</p>
        
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
