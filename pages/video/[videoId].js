import { useRouter } from "next/router";

const Video = () => {
  const router = useRouter();

  return <div>video page {router.query.videoId}</div>;
};

export default Video;
