import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Head from "next/head";
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
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
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
