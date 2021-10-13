import { Prisma } from ".prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../integrations/db";

export async function handleCreateFeedback(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body;
  const ip = getRemoteIP(req);
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

  let query: Prisma.FeedbackFindManyArgs = {
    orderBy: {
      createdAt: "desc",
    },
    include: {
      device: true,
    },
  };

  if (dateRange) {
    const dateRangeArray = dateRange?.split(",");
    query = {
      ...query,
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
  }

  return res.json(await prisma.feedback.findMany(query));
}

function getRemoteIP(req: NextApiRequest) {
  console.log("attempting to get remote IP...");
  console.log("X-Forwarded-For", req.headers["X-Forwarded-For"]);
  console.log("X-Real-IP", req.headers["X-Real-IP"]);
  return (
    req.headers["X-Forwarded-For"] ||
    req.headers["X-Real-IP"] ||
    req.socket.remoteAddress.replace(/.*:.*:.*:/, "")
  );
}
