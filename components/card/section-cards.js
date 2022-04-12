import Card from "./card";
import Link from "next/link";
import styles from "./section-cards.module.css";

const SectionCards = ({ title, videos = [], size }) => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        {videos.map((video, i) => {
          return (
            <>
              <Link href={`/video/${video.id}`}>
                <a>
                  <Card key={i} id={i} imgUrl={video.imgUrl} size={size} />
                </a>
              </Link>
            </>
          );
        })}
      </div>
    </section>
  );
};

export default SectionCards;
