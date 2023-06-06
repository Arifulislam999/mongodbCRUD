import React from "react";
import { Roboto_Slab } from "next/font/google";
import { BiEdit, BiTrashAlt } from "react-icons/bi";
import Link from "next/link";

const Rb = Roboto_Slab({
  weight: "800",
  subsets: ["latin"],
});
const SingleUser = ({ user }) => {
  const handlerDelete = async () => {
    try {
      await fetch(`/api/blogs?id=${user._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }
    console.log("click");
  };
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 mt-4 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 arif-1 ">
      <div className="mt-2 flex justify-end ">
        <div>
          <Link href={`/editblog?id=${user._id}`}>
            <button className="text-2xl text-green-400 font-bold cursor-pointer mx-2 hover:text-green-600 delay-100 transition-all">
              <BiEdit />
            </button>
          </Link>
        </div>
        <div>
          <button
            onClick={handlerDelete}
            className="text-2xl text-red-400 font-bold cursor-pointer mx-2 hover:text-red-600 delay-200 transition-all"
          >
            <BiTrashAlt />
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center pb-10">
        <img
          className="w-24 h-24 mb-3 mt-3 rounded-full shadow-lg"
          src="https://images.pexels.com/photos/13087558/pexels-photo-13087558.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
          alt="Bonnie image"
        />
        <h5
          className={`mb-1 text-md font-medium text-gray-900 dark:text-white ${Rb.className}`}
        >
          Name: <span className="text-red-500"> {user.name}</span>
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Email:{user.email}
        </span>
        <div className="flex mt-4 space-x-3 md:mt-6">
          <a
            href="#"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add friend
          </a>
          <a
            href="#"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
          >
            Message
          </a>
        </div>
      </div>
    </div>
  );
};

export default SingleUser;
