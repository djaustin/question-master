import { NextApiHandler } from "next";
import {
  handleCreateEmailQueue,
} from "../../controllers/email";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") return await handleCreateEmailQueue(req, res);
};

export default handler;