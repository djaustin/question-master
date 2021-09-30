import prisma from "../../integrations/db";
import { NextApiHandler } from "next";
import { createFeedback } from "../../controllers/createFeedback";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") return res.json(await createFeedback(req.body));
  if (req.method === "GET") return res.json(await prisma.feedback.findMany({
    where: {
      createdAt:{
        gte: new Date(
          ''
        )
      }
    }
  }))
};

export default handler;
