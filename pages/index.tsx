import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Films from "../components/Films";
import Header from "../components/Header";
import Layout from "../components/Layout";
import SearchInput from "../components/Search";

const Home: NextPage = () => {
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);

  const handleSearch = (name: string) => {
    setSearch(name);
  };

  useEffect(() => {
    const favorited: string[] = JSON.parse(
      localStorage.getItem("filmID") as string
    );
    setFavorites(favorited);
  }, []);

  return (
    <div>
      <Head>
        <title>Woltz Films</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header
        title="Woltz Films"
        redirect="My Watchlist"
        linkTo="/watchlist"
        quanty={favorites?.length}
      />
      <Layout>
        <SearchInput onClick={handleSearch} />
        <Films name={search} setFavorite={setFavorites} />
      </Layout>
    </div>
  );
};

export default Home;
