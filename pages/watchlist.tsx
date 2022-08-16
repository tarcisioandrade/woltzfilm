import Layout from "../components/Layout";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { GET_FILM_BY_ID } from "../API";
import { Film } from "../types/ApiResponse";
import Head from "next/head";

const Watchlist = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [films, setFilms] = useState<Film[]>([]);

  useEffect(() => {
    if (window != undefined) {
      const favorited: string[] = JSON.parse(
        localStorage.getItem("filmID") as string
      );
      setFavorites(favorited);
    }
  }, []);

  return (
    <>
      <Head>
        <title>My Watchlist</title>
      </Head>
      <Header title="My WatchList" redirect="Search More Films" linkTo="/" />
      <Layout>
        <div>Watchlist</div>
      </Layout>
    </>
  );
};

export default Watchlist;
