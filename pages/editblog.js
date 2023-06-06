import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import dbConnect from "./api/db.config";
import { ObjectId } from "mongodb";

const EditBlog = ({ blog }) => {
  const router = useRouter();
  const [name, setName] = useState(blog.name);
  const [email, setEmail] = useState(blog.email);
  const [loading, setLoading] = useState(false);
  const handlerSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = { name, email };
      await fetch(`/api/blogs?id=${blog?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      router.replace("/user");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Head>
        <title>Edit Blog...</title>
      </Head>
      <form onSubmit={handlerSubmit}>
        <div className="mb-6">
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Name:
            </label>
            <input
              type="text"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button
          disabled={loading}
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {loading ? "Loading...." : "Update"}
        </button>
      </form>

      <div>
        <Link href={"/user"}>
          <button
            type="button"
            className="text-white mt-3 float-right bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-blue-800"
          >
            Back
          </button>
        </Link>
      </div>
    </div>
  );
};

export default EditBlog;

export const getServerSideProps = async (context) => {
  const { id } = context.query;
  console.log("Id: ", id);
  const client = await dbConnect();
  const db = client.db("test_db");
  const blogsCollection = db.collection("blogs");
  const result = await blogsCollection.findOne({ _id: new ObjectId(id) });

  const blog = JSON.parse(JSON.stringify(result));
  return {
    props: { blog },
  };
};
