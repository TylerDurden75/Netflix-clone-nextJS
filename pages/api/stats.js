import jwt from "jsonwebtoken";
import { findVideoIdByUser, updateStats } from "../../lib/db/hasura";

export default async function stats(req, res) {
  if (req.method === "POST") {
    try {
      const token = req.cookies.token;
      if (!token) {
        res.status(403).send({});
      } else {
        const videoId = req.query.videoId;
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        const userId = decodedToken.issuer;

        const doesStatsExist = await findVideoIdByUser(token, userId, videoId);
        if (doesStatsExist) {
          //update it
          const response = await updateStats(token, {
            watched: true,
            userId,
            videoId: "aWzlQ2N6qqg",
          });
          res.send({ msg: "it works", updateStats: response });
        } else {
          //add it
          res.send({ msg: "it works", decodedToken, doesStatsExist });
        }
        res.send({ msg: "it's ok", decodedToken, doesStatsExist });
      }
    } catch (error) {
      console.error("Something went wrong /stats", error);
      res.status(500).send({ done: false, error: error?.message });
    }
  }
}
