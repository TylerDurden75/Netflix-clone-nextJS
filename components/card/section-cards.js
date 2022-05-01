import Card from "./card";
import Link from "next/link";
import styles from "./section-cards.module.css";
import cl from "classnames";

import { Fragment } from "react";

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
            <Fragment key={i}>
              <Link href={`/video/${video.id}`}>
                <a>
                  <Card
                    id={i}
                    imgUrl={video.imgUrl}
                    size={size}
                    shouldScale={shouldScale}
                  />
                </a>
              </Link>
            </Fragment>
          );
        })}
      </div>
    </section>
  );
};

export default SectionCards;
