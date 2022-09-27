import type { NextPage } from "next";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Table from "../components/Table";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Celetel</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex">
        <Navbar />

        <Table />
      </main>
    </div>
  );
};

export default Home;
