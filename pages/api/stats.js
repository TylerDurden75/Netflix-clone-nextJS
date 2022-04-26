export default async function stats(req, res) {
  if (req.method === "POST") {
    res.send({ msg: "it's ok" });
  }
}
