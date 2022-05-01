import Head from "next/head";
import styles from "../../styles/Mylist.module.css";

import SectionCards from "../../components/card/section-cards";
import NavBar from "../../components/nav/navbar";

import { getMyList } from "../../lib/videos";
import useRedirectUser from "../../utils/useRedirectUser";

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
  const videos = await getMyList(userId, token);

  return {
    props: {
      myListVideos: videos,
    },
  };
}

const MyList = ({ myListVideos }) => {
  return (
    <div>
      <Head>
        <title>My list</title>
      </Head>
      <main className={styles.main}>
        <NavBar />
        <div className={styles.sectionWrapper}>
          <SectionCards
            title="My list"
            videos={myListVideos}
            size="small"
            shouldWrap
            shouldScale={false}
          />
        </div>
      </main>
    </div>
  );
};

export default MyList;
