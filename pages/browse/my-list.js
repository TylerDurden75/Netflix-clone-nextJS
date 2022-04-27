import Head from "next/head";
import styles from "../../styles/Mylist.module.css";

import SectionCards from "../../components/card/section-cards";
import NavBar from "../../components/nav/navbar";

const MyList = () => {
  return (
    <div>
      <Head>
        <title>My list</title>
      </Head>
      <main className={styles.main}>
        <NavBar />
        <div className={styles.sectionWrapper}>
          <SectionCards title="My list" videos={[]} size="small" />
        </div>
      </main>
    </div>
  );
};

export default MyList;
