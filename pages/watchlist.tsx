import Layout from "../components/Layout";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import Head from "next/head";
import FilmFavorited from "../components/FilmFavorited";
import FilmNotFound from "../components/FilmNotFound";

const Watchlist = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const favorited: string[] = JSON.parse(
      localStorage.getItem("filmID") as string
    );
    setFavorites(favorited);
  }, []);

  const favoriteDone = favorites && favorites.length > 0;

  return (
    <>
      <Head>
        <title>My Watchlist</title>
      </Head>
      <Header title="My WatchList" redirect="Search More Films" linkTo="/" />
      <Layout>
        <div className={`${favoriteDone && "grid grid-cols-1 gap-6 my-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"}`}>
          {favoriteDone ? (
            favorites.map((item, i) => (
              <FilmFavorited setFavorite={setFavorites} imdbID={item} key={i} />
            ))
          ) : (
            <FilmNotFound />
          )}
        </div>
      </Layout>
    </>
  );
};

export default Watchlist;
