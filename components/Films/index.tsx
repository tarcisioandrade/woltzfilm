/* eslint-disable @next/next/no-img-element */
import { Heart } from "phosphor-react";
import { useState } from "react";
import { GET_DEFAULT_FILM_BY_TITLE } from "../../API";
import FilmNotFound from "../FilmNotFound";
import ModalFilm from "../ModalFilm";
import Pagination from "../Pagination";

type Props = {
  name: string;
  setFavorite: (newValue: string[]) => void;
};

const Films = ({ name, setFavorite }: Props) => {
  const [idFilm, setIdFilm] = useState("");
  const [modalActive, setModalActive] = useState(false);
  const [page, setPage] = useState(1);
  const handleActive = () => setModalActive(!modalActive);

  const { data, loading } = GET_DEFAULT_FILM_BY_TITLE(
    name == "" ? "Transformers" : name,
    page
  );

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
  const totalPages = Math.ceil(+data?.totalResults / 10);

  const skeleton = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  if (data?.Response === "False") return <FilmNotFound />;
  return (
    <>
      <div className="min-h-[824px]">
        <div className="grid grid-cols-1 gap-6 my-10 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-5">
          {loading &&
            skeleton.map((_, i) => (
              <div key={i} className="w-full h-[400px] bg-slate-800" />
            ))}
          {data &&
            data.Search?.map((data) => (
              <div
                className="group relative overflow-hidden xl:cursor-pointer "
                key={data.imdbID}
                onClick={() => {
                  setIdFilm(data.imdbID);
                  handleActive();
                }}
              >
                <div>
                  {data.Poster === "N/A" ? (
                    <img
                      src="/img/sad-img.png"
                      alt="image not found"
                      className="w-full h-[400px] transition-transform duration-300 group-hover:scale-[1.05]"
                    />
                  ) : (
                    <img
                      className="w-full h-[400px] transition-transform duration-300 group-hover:scale-[1.05]"
                      src={data.Poster}
                      alt={data.Title}
                    />
                  )}
                </div>
                <div className="absolute top-0 left-0 w-full h-full bg-black/40 invisible group-hover:visible ">
                  <div className="flex flex-col items-center text-center justify-center h-full relative">
                    <div className="absolute top-2 right-2">
                      {isFavorite(data.imdbID) ? (
                        <Heart
                          size={20}
                          className="text-gray-200"
                          weight="fill"
                        />
                      ) : (
                        <Heart size={20} className="text-gray-200" />
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
      </div>

      <Pagination
        page={page}
        nextPage={() => setPage(page + 1)}
        prevPage={() => setPage(page - 1)}
        totalPages={totalPages}
      />

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

export default Films;
