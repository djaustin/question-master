import { Prisma, PrismaClient } from ".prisma/client";

const prisma = new PrismaClient();

export async function createFeedback(data: Prisma.FeedbackCreateInput) {
  return await prisma.feedback.create({ data });
}
