import type { NextPage } from "next";
import Head from "next/head";
import { useSelector } from "react-redux";
import { selectUser } from "../slices/userSlice";
import Login from "./login";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import TopNav from "../components/TopNav";

const Home: NextPage = () => {
  const user = useSelector(selectUser);
  console.log("user", user);

  return (
    <div>
      <Head>
        <title>Celetel</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {user ? (
        <main className="flex w-screen">
          <div className="2/12">
            <Navbar />
          </div>
          <div className="w-full">
            <TopNav />
            <Table />
          </div>
        </main>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default Home;
