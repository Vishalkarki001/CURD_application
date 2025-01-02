"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdModeEdit } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { RiDeleteBack2Fill } from "react-icons/ri";

const Profile = () => {
  const router = useRouter();
  const [data, setData] = useState<any>([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/profile");
        setData(response.data.users || []);
        setFilteredData(response.data.users || []);
      } catch (error) {
        console.log("error");
      }
    };
    fetchData();
  }, []);

  if (!data) {
    return <p>Loading..</p>;
  }

  const handleDelete = async (deleteid: string) => {
    try {
      await axios.delete(`/api/delete/${deleteid}`);
      setData((prevData) => prevData.filter((user: any) => user._id !== deleteid));
      setFilteredData((prevData) => prevData.filter((user: any) => user._id !== deleteid));
      router.push("/profile");
    } catch (error) {
      console.log("Error deleting user:", error);
      alert("Failed to delete user");
    }
  };

  const submitSearch = () => {
    const filtered = data.filter((val: any) =>
      val.name.toLowerCase().includes(search.toLowerCase()) ||
      val.email.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(filtered);
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
                <th className="py-2 px-4 text-left font-semibold text-gray-700 text-sm sm:text-base">
                  S. No
                </th>
                <th className="py-2 px-4 text-left font-semibold text-gray-700 text-sm sm:text-base">
                  Name
                </th>
                <th className="py-2 px-4 text-left font-semibold text-gray-700 text-sm sm:text-base">
                  Email
                </th>
                <th className="py-2 px-4 text-left font-semibold text-gray-700 text-sm sm:text-base">
                  Phone Number
                </th>
                <th className="py-2 px-4 text-left font-semibold text-gray-700 text-sm sm:text-base">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-2 px-4 text-red-700 text-sm sm:text-lg font-semibold text-center"
                  >
                    No users found
                  </td>
                </tr>
              ) : (
                filteredData.map((user: any, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 px-4 text-gray-700 text-sm sm:text-base">{index + 1}</td>
                    <td className="py-2 px-4 text-gray-700 text-sm sm:text-base">{user.name}</td>
                    <td className="py-2 px-4 text-gray-700 text-sm sm:text-base">{user.email}</td>
                    <td className="py-2 px-4 text-gray-700 text-sm sm:text-base">{user.number}</td>
                    <td className="py-2 px-4 flex flex-col sm:flex-row gap-2">
                      <Link
                        href={`/edit/${user.id}`}
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

        <div className="flex justify-center items-center mt-6">
          <Link
            className="bg-orange-400 text-white text-sm sm:text-xl font-semibold justify-center ml-0 sm:ml-10 p-3 sm:p-4 rounded-lg"
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
