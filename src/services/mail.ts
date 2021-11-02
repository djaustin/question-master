import { Prisma } from "@prisma/client";
import { promisify } from "util";
import { redisClient } from "../integrations/redis";
import prisma from "../integrations/db";

const lpush = promisify(redisClient.lpush).bind(redisClient);

export type MailPayload = {
  subject: string;
  message: string;
  recipients: string[];
};

export const createMailTask = async (payload: MailPayload) => {
  const listName = process.env.REDIS_KEY;
  await lpush(listName, JSON.stringify(payload));
};

export async function processMailSend(data: Prisma.FeedbackCreateInput) {
  const message = `<p>Feedback has been received:</p>
    <ul>
      <li>Score:&nbsp;<strong>${data.score}</strong></li>
      <li>Comment:&nbsp;<strong>${data.comment ?? ""}</strong></li>
      <li>Username:&nbsp;<strong>${data.username ?? ""}</strong></li>
    </ul>`;
  if (data.score <= 1 || data.username) {
    try {
      const data = await prisma.config.findMany();
      const recipients = [data.find((config) => config.key === "emailAddress").value] || process.env.MAIL_RECIPIENTS?.split(",");
      const subject = data.find((config) => config.key === "emailSubject").value || process.env.MAIL_SUBJECT || "User feedback received";
      await createMailTask({ subject, message, recipients });
    } catch (err) {
      console.log("Unable to process mail send", err);
    }
  }
}
