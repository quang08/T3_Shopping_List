import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Shopping List</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mx-auto my-12 max-w-3xl">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold">My Shopping List</h2>
          <button
            type="button"
            className="rounded-md bg-blue-500 p-2 text-white transition duration-300 hover:bg-blue-600"
          >
            Add Shopping Item
          </button>
        </div>
      </main>
    </>
  );
};

export default Home;
