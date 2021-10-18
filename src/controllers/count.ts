import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../integrations/db";

export async function handleGetCount(
  res: NextApiResponse
) {
  return res.json(await prisma.feedback.count());
}
