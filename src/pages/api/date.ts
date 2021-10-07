import prisma from "../../integrations/db";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const dateRange = req.query.dateRange as string;
  const dateRangeArray = dateRange?.split(",");

  if (req.method === "GET") {
    return res.json(
      await prisma.feedback.findMany({
        where: {
          AND: [
            {
              createdAt: {
                gte: dateRangeArray?.[0],
              },
            },
            {
              createdAt: {
                lte: dateRangeArray?.[1],
              },
            },
          ],
        },
      })
    );
  }
};

export default handler;
