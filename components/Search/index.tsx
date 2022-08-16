import { MagnifyingGlass } from "phosphor-react";
import { FormEvent, KeyboardEvent, useState } from "react";

type Props = {
  onClick: (newName: string) => void;
};

const SearchInput = ({ onClick }: Props) => {
  const [search, setSearch] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onClick(search);
  };

  return (
    <form
      className="flex items-center gap-2 pl-2 h-10 rounded-md bg-blue-900/40 w-[800px] mx-auto mt-[-20px] text-lg"
      onSubmit={handleSubmit}
    >
      <MagnifyingGlass size={24} />
      <input
        className="bg-transparent outline-none border-none w-full"
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      <button className="bg-blue-900 hover:bg-blue-800 transition-colors h-full rounded-r-md w-52 flex items-center justify-center cursor-pointer">
        Search
      </button>
    </form>
  );
};

export default SearchInput;
