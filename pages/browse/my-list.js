import { Head } from "next/head";
import SectionCards from "../../components/card/section-cards";
import NavBar from "../../components/nav/navbar";

const MyList = () => {
  return (
    <div>
      <Head>
        <title>My list</title>
      </Head>
      <main>
        <NavBar />
        <div>
          <SectionCards title="My list" videos={[]} size="small" />
        </div>
      </main>
    </div>
  );
};

export default MyList;
