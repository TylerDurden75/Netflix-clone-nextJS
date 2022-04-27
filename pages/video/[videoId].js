import { useState } from "react";
import { useRouter } from "next/router";
import Modal from "react-modal";

import { getYoutubeVideoById } from "../../lib/videos";
import NavBar from "../../components/nav/navbar";
import Like from "../../components/icons/like-icon";
import Dislike from "../../components/icons/dislike-icon";

import styles from "../../styles/Video.module.css";
import cl from "classnames";

Modal.setAppElement("#__next");

export async function getStaticProps(context) {
  const videoId = context.params.videoId;

  const videoArray = await getYoutubeVideoById(videoId);

  return {
    props: {
      video: videoArray.length > 0 ? videoArray[0] : {},
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const listOfVideo = ["9Jar2XkBboo", "h6hZkvrFIj0", "8LuxOYIpu-I"]; //snatch / lock / trainspotting

  const paths = listOfVideo.map((videoId) => ({
    params: { videoId },
  }));

  return { paths, fallback: "blocking" };
}

const Video = ({ video }) => {
  const router = useRouter();
  const [toggleLike, setToggleLike] = useState(false);
  const [toggleDislike, setToggleDislike] = useState(false);

  const videoId = router.query.videoId;

  const {
    title,
    publishTime,
    description,
    channelTitle,
    statistics: { viewCount } = { viewCount: 0 },
  } = video;

  const handleToggleDislike = async () => {
    setToggleDislike(!toggleDislike);
    setToggleLike(toggleDislike);

    const val = !toggleDislike;

    const response = await fetch("/api/stats", {
      method: "POST",
      body: JSON.stringify({ videoId, favourited: val ? 0 : 1 }),
      headers: {
        "Content-type": "application/json",
      },
    });
    console.log("data", await response.json());
  };

  const handleToggleLike = async () => {
    setToggleLike(val);
    setToggleDislike(toggleLike);

    const val = !toggleLike;

    const response = await fetch("/api/stats", {
      method: "POST",
      body: JSON.stringify({ videoId, favourited: val ? 1 : 0 }),
      headers: {
        "Content-type": "application/json",
      },
    });
    console.log("data", await response.json());
  };

  return (
    <div className={styles.container}>
      <NavBar />
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
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&origin=http://example.com&controls=0&rel=0`}
          frameBorder="0"
          className={styles.videoPlayer}
        ></iframe>

        <div className={styles.likeDislikeBtnWrapper}>
          <div className={styles.likeBtnWrapper}>
            <button onClick={handleToggleLike}>
              <div className={styles.btnWrapper}>
                <Like selected={toggleLike} />
              </div>
            </button>
          </div>
          <button onClick={handleToggleDislike}>
            <div className={styles.btnWrapper}>
              <Dislike selected={toggleDislike} />
            </div>
          </button>
        </div>

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
