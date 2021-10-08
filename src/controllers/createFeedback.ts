import { Prisma } from "@prisma/client";
import { NextApiRequest } from "next";
import prisma from "../integrations/db";

export async function createFeedback(data: Prisma.FeedbackCreateInput) {
  return await prisma.feedback.create({ data });
}

export async function getFeedback(query: NextApiRequest["query"]) {
  const dateRange = query.dateRange as string;

  if (!dateRange) return prisma.feedback.findMany();

  const dateRangeArray = dateRange?.split(",");

  return prisma.feedback.findMany({
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
  });
}
