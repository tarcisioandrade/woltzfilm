import useSWR from "swr";
import { ApiResponse, Film } from "../types/ApiResponse";

const basePath = `http://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}&`;

const fetcher = (...args: [string]) => fetch(...args).then((res) => res.json());
type ResponseData = {
  data: ApiResponse;
  loading: boolean;
  error: any;
};

type ResponseUniqueFilme = {
  data: Film;
  loading: boolean;
  error: any;
};

export const GET_DEFAULT_FILM_BY_TITLE = (
  title: string,
  page: number = 1
): ResponseData => {
  const { data, error } = useSWR(`${basePath}s=${title}&page=${page}`, fetcher);

  return {
    data,
    loading: !error && !data,
    error,
  };
};

export const GET_FILM_BY_ID = (id: string): ResponseUniqueFilme => {
  const { data, error } = useSWR(`${basePath}i=${id}&plot=full`, fetcher);

  return {
    data,
    loading: !error && !data,
    error,
  };
};
