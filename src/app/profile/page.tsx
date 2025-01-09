"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdModeEdit } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { useSearchParams } from "next/navigation";
import { GrLinkNext } from "react-icons/gr";
import { GrLinkPrevious } from "react-icons/gr";
import { FaLongArrowAltUp } from "react-icons/fa";

import { FaLongArrowAltDown } from "react-icons/fa";

interface User {
  _id: string;
  name: string;
  email: string;
  number: string;
}

const Profile = () => {
  const router = useRouter();
  const [data, setData] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState<User[]>([]);
  const [perPage, setPerPage] = useState<number>(4); // initialize with default value

  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") ?? "1");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/profile");
        setData(response.data.users || []);
        setFilteredData(response.data.users || []);
      } catch (error) {
        console.log("error",error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const start = (page - 1) * perPage;
    const end = start + perPage;
    setFilteredData(data.slice(start, end)); // Update filtered data based on pagination
  }, [data, page, perPage]); // Only depend on data, page, and perPage

  const handleDelete = async (userId: string) => {
    console.log("fronted UserId", userId);
    try {
      await axios.delete(`/api/delete/?userId=${userId}`);
      setData((prevData) => prevData.filter((user: User) => user._id !== userId));
      setFilteredData((prevData) => prevData.filter((user: User) => user._id !== userId));
      router.push("/profile");
    } catch (error) {
      console.log("Error deleting user:", error);
      alert("Failed to delete user");
    }
  };

  const submitSearch = () => {
    const filtered = data.filter((val: User) =>
      val.name.toLowerCase().includes(search.toLowerCase()) ||
      val.email.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handlePagination = (newPage: number) => {
    router.push(`?page=${newPage}&perPage=${perPage}`);
  };

  const handlePerPage = (newPerPage: number) => {
    setPerPage(newPerPage);
    router.push(`?page=${page}&perPage=${newPerPage}`);
  };

  return (
    <>
      <div className="w-full min-h-screen bg-gray-100 p-4 sm:p-8">
        <div className="flex flex-col sm:flex-row w-full justify-center items-center p-4 sm:p-6">
          <input
            className="w-full sm:w-1/2 text-center p-3 sm:p-4 rounded-lg outline-none mb-4 sm:mb-0"
            type="search"
            value={search}
            name="search"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for user"
          />
          <button
            onClick={submitSearch}
            className="ml-0 sm:ml-4 p-3 sm:p-4 bg-transparent text-xl rounded-lg items-center border border-gray-300"
          >
            <FaSearch />
          </button>
        </div>

        <div className="max-w-4xl mx-auto bg-white p-4 sm:p-6 rounded-lg shadow-lg overflow-x-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-700 mb-6">
            Users Information
          </h2>

          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-4 text-left font-semibold text-gray-700 text-sm sm:text-base">S.No</th>
                <th className="py-2 px-4 text-left font-semibold text-gray-700 text-sm sm:text-base">Name</th>
                <th className="py-2 px-4 text-left font-semibold text-gray-700 text-sm sm:text-base">Email</th>
                <th className="py-2 px-4 text-left font-semibold text-gray-700 text-sm sm:text-base">Phone Number</th>
                <th className="py-2 px-4 text-left font-semibold text-gray-700 text-sm sm:text-base">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-2 px-4 text-red-700 text-sm sm:text-lg font-semibold text-center">
                    No users found
                  </td>
                </tr>
              ) : (
                filteredData.map((user: User, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 px-4 text-gray-700 text-sm sm:text-base">{index + 1}</td>
                    <td className="py-2 px-4 text-gray-700 text-sm sm:text-base">{user.name}</td>
                    <td className="py-2 px-4 text-gray-700 text-sm sm:text-base">{user.email}</td>
                    <td className="py-2 px-4 text-gray-700 text-sm sm:text-base">{user.number}</td>
                    <td className="py-2 px-4 flex flex-col sm:flex-row gap-2">
                      <Link
                        href={`/edit/${user._id}`}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                      >
                        <MdModeEdit />
                      </Link>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm sm:text-base"
                      >
                        <RiDeleteBack2Fill />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center items-center gap-6 mt-6">
          <button
            className="p-2 border-2 bg-blue-600 rounded-lg px-9 font-semibold text-white disabled:bg-gray-500"
            onClick={() => handlePagination(page - 1)}
            disabled={page <= 1}
          >
            <GrLinkPrevious />
          </button>
          <p className="text-md font-semibold">Page no {page}</p>
          <button
            className="p-2 border-2 bg-blue-600 rounded-lg px-9 text-white font-semibold disabled:bg-gray-500"
            onClick={() => handlePagination(page + 1)}
            disabled={filteredData.length < perPage }
          >
            <GrLinkNext />
          </button>
          <p className="text-md font-semibold disabled:bg-gray-500">Total Users {perPage}</p>
          <div className="flex justify-center gap-4">
            <button 
             className="p-2 border-2 bg-blue-600 rounded-lg px-9 text-white font-semibold disabled:bg-gray-500"
            onClick={() => handlePerPage(perPage + 1)} disabled ={  perPage > filteredData.length}><FaLongArrowAltDown /></button>
            <button
             className="p-2 border-2 bg-blue-600 rounded-lg px-9 text-white font-semibold disabled:bg-gray-500"
            
             onClick={() => handlePerPage(perPage - 1)} disabled ={perPage  < 1}><FaLongArrowAltUp /></button>
          </div>
         

         
        </div>
        <div className="flex justify-center items-center mt-4">
        <Link
            className="bg-orange-400 text-white text-sm sm:text-xl font-semibold mt-4 px-15 ml-0 sm:ml-10 p-3 sm:p-4 rounded-lg"
            href="/add"
          >
            Add User
          </Link>
          </div>
      </div>
    </>
  );
};

export default Profile;
