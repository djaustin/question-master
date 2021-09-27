import { Prisma } from "@prisma/client";
import prisma from "../integrations/db";

export async function createFeedback(data: Prisma.FeedbackCreateInput) {
  return await prisma.feedback.create({ data });
}
