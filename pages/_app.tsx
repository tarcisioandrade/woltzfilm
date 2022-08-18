import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AppFavContext } from "../context/FavoritesContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppFavContext>
      <Component {...pageProps} />
    </AppFavContext>
  );
}

export default MyApp;
