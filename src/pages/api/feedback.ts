import { Prisma } from ".prisma/client";
import { NextApiHandler } from "next";
import { createFeedback } from "../../controllers/createFeedback";

const handler: NextApiHandler = (req, res) => {
  if (req.method === "POST") res.json(createFeedback(req.body));
};

export default handler;
