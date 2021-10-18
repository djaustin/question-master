import { NextApiHandler } from "next";
import {
  handleGetCount,
} from "../../controllers/count";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") return await handleGetCount(res);
};

export default handler;
