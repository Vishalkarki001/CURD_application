"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

function Home() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [validation, setValidation]=useState<string |null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    // Validation logic
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setValidation("Please enter a valid email address.");
      return;
    }

    if (!/^\d{10}$/.test(formData.number)) {
      setValidation("Phone number must be exactly 10 digits.");
      return;
    }

    if (!formData.name || !formData.email || !formData.number) {
      alert("Please fill in all fields.");
      return;
    }

    // console.log("This is form data:", formData);

    try {
         const response = await axios.post("/api/add", formData);
         setError(null);
         console.log("Raw Response:", response.data);
       router.push("/profile");
    }  catch (error) {

       if (axios.isAxiosError(error)) {
        const backendData = error.response?.data;
        setError(JSON.stringify(backendData) || "An unexpected error occurred");
        console.log(error);
      } else {
        setError("An unexpected error");
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h1 className="text-2xl font-bold text-center mb-6">User Registration</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="number" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="text"
            id="number"
            name="number"
            value={formData.number}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create
          </button>
          <p className="text-xl text-red-500 mt-4">{validation}</p>
        </div>
      </form>

      {error && <p className="text-red-500 text-xl mt-4">{error}</p>}
    </div>
  );
}

export default Home;
