import Card from "./card";
import styles from "./section-cards.module.css";

const SectionCards = ({ title }) => {
  return (
    <>
      <section className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.cardWrapper}>
          <Card id={0} imgUrl="/static/snatch.jpg" size="large" />
        </div>
      </section>

      <section className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.cardWrapper}>
          <Card size="small" />
        </div>
      </section>

      <section className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.cardWrapper}>
          <Card size="medium" />
        </div>
      </section>
    </>
  );
};

export default SectionCards;
