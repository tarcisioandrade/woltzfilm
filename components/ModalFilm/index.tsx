/* eslint-disable @next/next/no-img-element */
import { Heart, Star, X } from "phosphor-react";
import { GET_FILM_BY_ID } from "../../API";
import Layout from "../Layout";
import { useRef, useEffect, useState } from "react";
import getItem from "../../utils/getItem";

type Props = {
  imdID: string;
  setActive: () => void;
  isActive: boolean;
};

const ModalFilm = ({ imdID, setActive, isActive }: Props) => {
  const { data } = GET_FILM_BY_ID(imdID);
  const ref = useRef(null);

  const filmFavorites = JSON.parse(localStorage.getItem("filmID") as string);
  const [favorites, setFavorites] = useState<string[]>(filmFavorites || []);

  useEffect(() => {
    const outSideClick = (e: any) => {
      if (e.target.closest(".boxCard") && !e.target.closest(".card")) {
        setActive();
      }
    };
    document.addEventListener("click", outSideClick);
    return () => document.removeEventListener("click", outSideClick);
  }, [setActive]);

  const handleFavorite = () => {
    setFavorites((item) => [...item, imdID]);
  };

  const removeFavorite = () => {
    setFavorites(favorites.filter((item) => item != imdID));
  };

  useEffect(() => {
    localStorage.setItem("filmID", JSON.stringify(favorites));
  }, [favorites]);

  const isFavorited = favorites.filter((item) => item === imdID)[0];

  return (
    <div className="w-full h-screen bg-black/80 fixed top-0 left-0 bottom-0 boxCard">
      <Layout>
        <div className={`flex items-center justify-center h-screen`}>
          <div className="flex bg-gray-900 card relative" ref={ref}>
            <div className="absolute right-2 top-2 cursor-pointer">
              {isFavorited ? (
                <Heart
                  size={24}
                  className="text-red-500"
                  weight="fill"
                  onClick={removeFavorite}
                />
              ) : (
                <Heart
                  size={24}
                  className="text-red-500"
                  onClick={handleFavorite}
                />
              )}
            </div>
            <div>
              <img
                className="h-full w-full"
                src={data?.Poster}
                alt={data?.Title}
              />
            </div>
            <div className="p-6">
              <div className="flex h-fit items-center gap-4">
                <p className="text-3xl text-gray-100 max-w-sm">{data?.Title}</p>
                <div className="flex items-center gap-1 text-xs">
                  <Star size={12} weight="fill" color="gold" />
                  <p>{data?.imdbRating}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm text-slate-300 mt-2">
                <p>{data?.Year}</p>
                <p>{data?.Runtime}</p>
                <p>{data?.Genre}</p>
                <p>{data?.Director}</p>
              </div>

              <div className="mt-6 max-w-md leading-relaxed ">
                <p className="text-gray-400">{data?.Plot}</p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default ModalFilm;
