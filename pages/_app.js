import { useEffect } from "react";
import { useRouter } from "next/router";
import { magic } from "../lib/magic-client";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    getIsLoggedInAndRedirect();
  }, []);

  const getIsLoggedInAndRedirect = async () => {
    const isLoggedIn = await magic.user.isLoggedIn();
    if (isLoggedIn) {
      router.push("/");
    } else {
      router.push("/login");
    }
  };

  return <Component {...pageProps} />;
}

export default MyApp;
