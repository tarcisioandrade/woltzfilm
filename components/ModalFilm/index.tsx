/* eslint-disable @next/next/no-img-element */
import { Heart, Star } from "phosphor-react";
import { GET_FILM_BY_ID } from "../../API";
import { useAppContext } from "../../context/FavoritesContext";
import { useEffect } from "react";
import Layout from "../Layout";
import Loading from "../Loading";

type Props = {
  imdID: string;
  setActive: () => void;
  isActive: boolean;
  reUpdate?: (newValue: string[]) => void;
};

const ModalFilm = ({ imdID, setActive, isActive, reUpdate }: Props) => {
  const { data } = GET_FILM_BY_ID(imdID);
  const { favorites, removeFavorite, addFavorite } = useAppContext();

  useEffect(() => {
    const outSideClick = (e: any) => {
      if (e.target.closest(".boxCard") && !e.target.closest(".card")) {
        setActive();
      }
    };
    document.addEventListener("click", outSideClick);
    return () => document.removeEventListener("click", outSideClick);
  }, [setActive]);

  useEffect(() => {
    reUpdate && reUpdate(favorites);
    if (favorites?.length != 0) {
      localStorage.setItem("filmID", JSON.stringify(favorites));
    } else {
      localStorage.removeItem("filmID");
    }
  }, [favorites, reUpdate]);

  const isFavorited = favorites?.filter((item) => item === imdID)[0];

  if (!isActive) return null;
  return (
    <div className="w-full h-screen bg-black/80 fixed top-0 left-0 bottom-0 boxCard z-50">
      <Layout>
        <div className={`flex items-center justify-center h-screen`}>
          {!data && (
            <Loading type="bubbles" color="#1D4ED8" width={100} height={100} />
          )}
          {data && (
            <div className="sm:flex bg-gray-900 card relative">
              <div className="absolute right-2 top-2 cursor-pointer">
                {isFavorited ? (
                  <Heart
                    size={24}
                    className="text-red-500"
                    weight="fill"
                    onClick={() => removeFavorite(imdID)}
                  />
                ) : (
                  <Heart
                    size={24}
                    className="text-red-500"
                    onClick={() => addFavorite(imdID)}
                  />
                )}
              </div>
              <div className="hidden sm:block">
                {data?.Poster === "N/A" ? (
                  <img
                    className="h-full w-full"
                    src="/img/sad-img.png"
                    alt="image not found"
                  />
                ) : (
                  <img
                    className="h-full w-full"
                    src={data?.Poster}
                    alt={data?.Title}
                  />
                )}
              </div>
              <div className="p-6">
                <div className="flex h-fit items-center gap-4">
                  <p className="text-3xl text-gray-100 max-w-sm">
                    {data?.Title}
                  </p>
                  <div className="flex items-center gap-1 text-xs">
                    <Star size={12} weight="fill" color="gold" />
                    <p>{data?.imdbRating}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-xs md:text-sm text-slate-300 mt-2 flex-wrap">
                  <p>{data?.Year}</p>
                  <p>{data?.Runtime}</p>
                  <p>{data?.Genre}</p>
                  <p>{data?.Director}</p>
                </div>

                <div className="mt-6 max-w-md leading-relaxed ">
                  <p className="text-gray-400">
                    {data?.Plot === "N/A" ? "No have description" : data?.Plot}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Layout>
    </div>
  );
};

export default ModalFilm;
