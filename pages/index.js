import Head from "next/head";
import styles from "../styles/Home.module.css";

import useRedirectUser from "../utils/useRedirectUser";

import Banner from "../components/banner/banner";
import NavBar from "../components/nav/navbar";
import SectionCards from "../components/card/section-cards";

import {
  getVideos,
  getPopularVideos,
  getWatchItAgainVideos,
} from "../lib/videos";

//Server side rendering
export async function getServerSideProps(context) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { userId, token } = await useRedirectUser(context);

  // NOT NECESSARY WITH WIDDLEWARE
  if (!userId) {
    return {
      props: {},
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const watchItAgainVideos = await getWatchItAgainVideos(userId, token);
  const disneyVideos = await getVideos("marvel trailer");
  const popularVideos = await getPopularVideos();
  const docuVideos = await getVideos("docu");
  const cookingVideos = await getVideos("chef");
  return {
    props: {
      watchItAgainVideos,
      disneyVideos,
      popularVideos,
      docuVideos,
      cookingVideos,
    },
  };
}

export default function Home({
  watchItAgainVideos = [],
  disneyVideos,
  popularVideos,
  docuVideos,
  cookingVideos,
}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Nextflix</title>
        <meta
          name="description"
          content="Discover movie and like your favorite watching"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.main}>
        <NavBar />
        <Banner
          title="Snatch"
          subTitle="A Gipsy always have a plan"
          imgUrl="/static/snatch.jpg"
          videoId="m9EX0f6V11Y"
        />
        <div className={styles.sectionWrapper}>
          <SectionCards title="Marvel" videos={disneyVideos} size="large" />
          <SectionCards
            title="Watch it again"
            videos={watchItAgainVideos}
            size="small"
          />
          <SectionCards title="Popular" videos={popularVideos} size="small" />
          <SectionCards title="Documentary" videos={docuVideos} size="medium" />
          <SectionCards title="Cooking" videos={cookingVideos} size="small" />
        </div>
      </div>
    </div>
  );
}
