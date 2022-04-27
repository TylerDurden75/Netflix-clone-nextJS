import Card from "./card";
import Link from "next/link";
import styles from "./section-cards.module.css";
import cl from "classnames";

const SectionCards = ({
  title,
  videos = [],
  size,
  shouldWrap = false,
  shouldScale,
}) => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={cl(styles.cardWrapper, shouldWrap && styles.wrap)}>
        {videos.map((video, i) => {
          return (
            <>
              <Link href={`/video/${video.id}`}>
                <a>
                  <Card
                    key={i}
                    id={i}
                    imgUrl={video.imgUrl}
                    size={size}
                    shouldScale={shouldScale}
                  />
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
