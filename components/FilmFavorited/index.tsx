/* eslint-disable @next/next/no-img-element */
import { Heart } from "phosphor-react";
import { useState } from "react";
import { GET_FILM_BY_ID } from "../../API";
import ModalFilm from "../ModalFilm";

type Props = {
  imdbID: string;
  setFavorite: (newValue: string[]) => void;
};

const FilmFavorited = ({ imdbID, setFavorite }: Props) => {
  const { data } = GET_FILM_BY_ID(imdbID);
  const [idFilm, setIdFilm] = useState("");

  const [modalActive, setModalActive] = useState(false);
  const handleActive = () => setModalActive(!modalActive);

  return (
    <>
      <div>
        <div
          className="group relative overflow-hidden xl:cursor-pointer"
          key={imdbID}
          onClick={() => {
            setIdFilm(imdbID);
            handleActive();
          }}
        >
          <div>
            {data?.Poster === "N/A" ? (
              <img
                className="w-full h-[400px] transition-transform duration-300 group-hover:scale-[1.05]"
                src="/img/sad-img.png"
                alt="Image not Found"
              />
            ) : (
              <img
                className="w-full h-[400px] transition-transform duration-300 group-hover:scale-[1.05]"
                src={data?.Poster}
                alt={data?.Title}
              />
            )}
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-black/40 invisible group-hover:visible ">
            <div className="flex flex-col items-center text-center justify-center h-full relative">
              <div className="absolute top-2 right-2">
                <Heart size={20} className="text-gray-200" weight="fill" />
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-100">
                  {data?.Title}
                </p>
                <p className="text-sm text-gray-300">{data?.Year}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {idFilm && modalActive && (
        <ModalFilm
          isActive={modalActive}
          setActive={handleActive}
          imdID={idFilm}
          reUpdate={setFavorite}
        />
      )}
    </>
  );
};

export default FilmFavorited;
