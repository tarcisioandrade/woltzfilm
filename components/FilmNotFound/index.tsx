import { MonitorPlay } from "phosphor-react";

const FilmNotFound = () => {
  return (
    <div
      className="flex items-center justify-center"
      style={{ height: "calc(100vh - 180px)" }}
    >
      <div className="text-center font-bold text-3xl text-gray-100/10 leading-relaxed">
        <div>
          <MonitorPlay className="mx-auto" size={200} />
        </div>
        <p>
          Unable to find what you’re looking for.
          <br /> Please try another search.
        </p>
      </div>
    </div>
  );
};

export default FilmNotFound;
