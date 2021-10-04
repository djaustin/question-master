import prisma from "../../integrations/db";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const startDate = req.body[0];
  const endDate = req.body[0];

  if (req.method === "POST"){
    return res.json(await prisma.feedback.findMany({
      where: {
        AND: [
          {
            createdAt: {
              gte: startDate
            },
          },
          {
            createdAt: {
              lte: endDate
            },
          }
        ]}
    }));
  }
};

export default handler;
