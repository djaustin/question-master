import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../integrations/db";

export async function handleGetCount(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dateRange = req.query?.dateRange as string;

  if (dateRange) {
    const dateRangeArray = dateRange?.split(",");
    return res.json(await prisma.feedback.count({
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
    }))
  } else {
    return res.json(await prisma.feedback.count());
  }
}
