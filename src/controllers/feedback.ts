import { Prisma } from ".prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../integrations/db";

export async function handleCreateFeedback(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body;
  // The client can provide an IP address to get around container networking issues that prevent us getting the remote IP from the backend
  const ip = req.body.clientIp || getRemoteIP(req);
  // Prisma will reject the create function args if it has extra keys it doesn't need
  delete req.body.clientIp;
  return res.json(
    await prisma.feedback.create({
      data: {
        device: {
          connectOrCreate: {
            create: {
              ip,
            },
            where: {
              ip,
            },
          },
        },
        ...data,
      },
    })
  );
}

export async function handleGetFeedback(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dateRange = req.query?.dateRange as string;
  let skip: number = parseInt(req.query?.skip as string);
  let take: number = parseInt(req.query?.take as string);

  let feedbackQuery: Prisma.FeedbackFindManyArgs = {
    orderBy: {
      createdAt: "desc",
    },
    include: {
      device: true,
    },
  };

  let totalFeedbackCount = await prisma.feedback.count();

  if (dateRange) {
    const dateRangeArray = dateRange?.split(",");
    feedbackQuery = {
      ...feedbackQuery,
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
    };

    totalFeedbackCount = await prisma.feedback.count({
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

  if (skip) {
    feedbackQuery = {
      ...feedbackQuery,
      skip: skip,
    };
  }

  if (take) {
    feedbackQuery = {
      ...feedbackQuery,
      take: take,
    };
  }

  const results = {
    totalFeedbackCount: totalFeedbackCount,
    feedbackResults: await prisma.feedback.findMany(feedbackQuery),
  };

  return res.json(results);
}

function getRemoteIP(req: NextApiRequest) {
  return (
    req.headers["x-real-ip"] ||
    req.headers["x-forwarded-for"] ||
    req.socket.remoteAddress.replace(/.*:.*:.*:/, "")
  );
}
