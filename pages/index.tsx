import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import Films from "../components/Films";
import Header from "../components/Header";
import Layout from "../components/Layout";
import SearchInput from "../components/Search";

const Home: NextPage = () => {
  const [search, setSearch] = useState("");

  const handleSearch = (name: string) => {
    setSearch(name);
  };

  return (
    <div>
      <Head>
        <title>Woltz Films</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header title="Woltz Films" redirect="My Watchlist" linkTo="/watchlist" />
      <Layout>
        <SearchInput onClick={handleSearch} />
        <Films name={search} />
      </Layout>
    </div>
  );
};

export default Home;
