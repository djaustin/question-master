import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../integrations/db";

export async function handleCreateFeedback(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body;
  const remoteIP = getRemoteIP(req);
  return res.json(
    await prisma.feedback.create({
      data: {
        device: {
          connectOrCreate: {
            create: {
              ip: remoteIP,
            },
            where: {
              ip: remoteIP,
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

  if (!dateRange)
    return res.json(
      await prisma.feedback.findMany({ orderBy: { createdAt: "desc" } })
    );

  const dateRangeArray = dateRange?.split(",");

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
      orderBy: {
        createdAt: "desc",
      },
    })
  );
}

function getRemoteIP(req: NextApiRequest) {
  return req.socket.remoteAddress.replace(/.*:.*:.*:/, "");
}
