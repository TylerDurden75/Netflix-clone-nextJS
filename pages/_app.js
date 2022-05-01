import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { magic } from "../lib/magic-client";

import Loading from "../components/loading/loading";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  // NOT NECESSARY WITH WIDDLEWARE _middleware.js
  // import { NextResponse } from "next/server";
  // import { verifyToken } from "../lib/utils";

  // export async function middleware(req, ev) {
  //   const token = req ? req.cookies?.token : "";
  //   const userId = await verifyToken(token);
  //   const { pathname, origin } = req.nextUrl.clone();

  //   if ((token && userId) || pathname.includes(`${origin}/api/login`)) {
  //     return NextResponse.next();
  //   }
  //   if (!token && pathname !== `/login`) {
  //     return NextResponse.redirect(`${origin}/login`);
  //   }
  // }

  useEffect(() => {
    (async () => {
      const isLoggedIn = await magic.user.isLoggedIn();
      if (isLoggedIn) {
        router.push("/");
      } else {
        router.push("/login");
      }
    })();
  }, []);

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

  return isLoading ? <Loading /> : <Component {...pageProps} />;
}

export default MyApp;
