import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { magic } from "../lib/magic-client";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false);
    };
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return isLoading ? <div>Loading...</div> : <Component {...pageProps} />;
}

export default MyApp;
