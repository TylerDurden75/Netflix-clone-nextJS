import { useRouter } from "next/router";
import Modal from "react-modal";

import styles from "../../styles/Video.module.css";
import cl from "classnames";

Modal.setAppElement("#__next");

const Video = () => {
  const router = useRouter();

  const video = {
    title: "Toto",
    publishTime: "2022-13-04",
    description: "Avenger best history blablbalabalabala",
    channelTitle: "Marvel",
    viewCount: 10000,
  };

  const { title, publishTime, description, channelTitle, viewCount } = video;

  return (
    <div className={styles.container}>
      <Modal
        isOpen={true}
        contentLabel="Watch the video"
        onRequestClose={() => router.back()}
        overlayClassName={styles.overlay}
        className={styles.modal}
      >
        <iframe
          id="ytplayer"
          type="text/html"
          width="100%"
          height="420"
          src={`https://www.youtube.com/embed/${router.query.videoId}?autoplay=1&origin=http://example.com&controls=0&rel=0`}
          frameBorder="0"
          className={styles.videoPlayer}
        ></iframe>

        <div className={styles.modalBody}>
          <div className={styles.modalBodyContent}>
            <div className={styles.col1}>
              <p className={styles.publishTime}>{publishTime}</p>
              <p className={styles.title}>{title}</p>
              <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.col2}>
              <p className={cl(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>Cast: </span>
                <span className={styles.channelTitle}>{channelTitle}</span>
              </p>
              <p className={cl(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>View Count: </span>
                <span className={styles.channelTitle}>{viewCount}</span>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Video;
