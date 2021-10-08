import { NextApiHandler } from "next";
import { createFeedback, getFeedback } from "../../controllers/createFeedback";
import prisma from "../../integrations/db";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") return res.json(await createFeedback(req.body));
  if (req.method === "GET")
    return res.json(
      await prisma.feedback.findMany({
        orderBy: {
          createdAt: "desc",
        },
      })
    );
};

export default handler;
