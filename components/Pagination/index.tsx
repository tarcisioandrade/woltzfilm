import { CaretLeft, CaretRight } from "phosphor-react";
import { useEffect } from "react";

type Props = {
  page: number | string;
  nextPage: () => void;
  prevPage: () => void;
  totalPages: number | string;
};

const Pagination = ({ page, nextPage, prevPage, totalPages }: Props) => {
  const handlePrev = () => {
    if (page > 1) prevPage();
  };

  const handleNext = () => {
    if (page < totalPages) nextPage();
  };

  return (
    <div className="flex items-center justify-end gap-2 mb-10">
      <button onClick={handlePrev}>
        <CaretLeft size={32} />
      </button>
      <div>{`${page} / ${totalPages}`}</div>
      <button onClick={handleNext}>
        <CaretRight size={32} />
      </button>
    </div>
  );
};

export default Pagination;
