import React from "react";
import SingleUser from "./singleUser";
import Link from "next/link";
import Head from "next/head";

const user = ({ users }) => {
  return (
    <>
      <Head>
        <title>Total Users...</title>
      </Head>
      <Link href={"/add"}>
        <button
          type="button"
          className="mt-2 py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Add
        </button>
      </Link>
      <div className="arif">
        {users.name?.map((user, index) => {
          return <SingleUser key={index} user={user} />;
        })}
      </div>
    </>
  );
};

export default user;

export const getServerSideProps = async () => {
  // const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const res = await fetch("http://localhost:3000/api/blogs");
  const users = await res.json();
  return {
    props: {
      users,
    },
  };
};
