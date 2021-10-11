import { NextApiHandler } from "next";
import { createFeedback, getFeedback } from "../../controllers/createFeedback";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") return res.json(await createFeedback(req.body));
  if (req.method === "GET") return res.json(await getFeedback(req.query));
};

export default handler;
