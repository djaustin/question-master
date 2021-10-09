import { NextApiHandler } from "next";
import {
  handleCreateFeedback,
  handleGetFeedback,
} from "../../controllers/feedback";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") return await handleCreateFeedback(req, res);
  if (req.method === "GET") return await handleGetFeedback(req, res);
};

export default handler;
