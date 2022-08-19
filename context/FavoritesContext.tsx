import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

type ContextProp = {
  favorites: string[];
  setFavorites: Dispatch<SetStateAction<string[]>>;
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
};

const defaultValues: ContextProp = {
  favorites: [],
  setFavorites: () => null,
  addFavorite: () => null,
  removeFavorite: () => null,
};

const appContext = createContext(defaultValues);

export const useAppContext = () => useContext(appContext);

type Props = {
  children: ReactNode;
};

export const AppFavContext = ({ children }: Props) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    if (window !== undefined) {
      const filmFavorites = JSON.parse(
        localStorage.getItem("filmID") as string
      );
      setFavorites(filmFavorites || []);
    }
  }, []);

  const addFavorite = (imdID: string) => {
    setFavorites((item) => [...item, imdID]);
  };

  const removeFavorite = (imdID: string) => {
    const newValue = favorites.filter((item) => item != imdID);
    setFavorites(newValue);
  };

  return (
    <appContext.Provider
      value={{ favorites, setFavorites, addFavorite, removeFavorite }}
    >
      {children}
    </appContext.Provider>
  );
};
