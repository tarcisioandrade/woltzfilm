/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { Heart } from "phosphor-react";
import { useState } from "react";
import { GET_DEFAULT_FILM_BY_TITLE } from "../../API";
import getItem from "../../utils/getItem";
import FilmNotFound from "../FilmNotFound";
import ModalFilm from "../ModalFilm";

type Props = {
  name: string;
};

const Films = ({ name }: Props) => {
  const { data } = GET_DEFAULT_FILM_BY_TITLE(
    name == "" ? "Transformers" : name
  );
  const [idFilm, setIdFilm] = useState("");
  const [modalActive, setModalActive] = useState(false);
  const handleActive = () => setModalActive(!modalActive);

  const isFavorite = (id: string) => {
    if (window != undefined) {
      const favorited: string[] = JSON.parse(
        localStorage.getItem("filmID") as string
      );
      return favorited?.filter((item) => item === id)[0];
    } else {
      return undefined;
    }
  };

  if (data?.Response === "False") return <FilmNotFound />;
  return (
    <>
      <div className="grid grid-cols-5 gap-6 my-10">
        {data &&
          data.Search?.map((data) => (
            <div
              className="group relative overflow-hidden cursor-pointer"
              key={data.imdbID}
              onClick={() => {
                setIdFilm(data.imdbID);
                handleActive();
              }}
            >
              <div>
                <img
                  className="w-full h-[400px] transition-transform duration-300 group-hover:scale-[1.05]"
                  src={data.Poster}
                  alt={data.Title}
                />
              </div>
              <div className="absolute top-0 left-0 w-full h-full bg-black/40 invisible group-hover:visible ">
                <div className="flex flex-col items-center text-center justify-center h-full relative">
                  <div className="absolute top-2 right-2">
                    {isFavorite(data.imdbID) ? (
                      <Heart size={20} className="text-red-500" weight="fill" />
                    ) : (
                      <Heart size={20} className="text-red-500" />
                    )}
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-100">
                      {data.Title}
                    </p>
                    <p className="text-sm text-gray-300">{data.Year}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      {idFilm && modalActive && (
        <ModalFilm
          isActive={modalActive}
          setActive={handleActive}
          imdID={idFilm}
        />
      )}
    </>
  );
};

export default Films;
