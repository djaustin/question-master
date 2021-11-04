import { Prisma } from "@prisma/client";
import { promisify } from "util";
import { redisClient } from "../integrations/redis";
import prisma from "../integrations/db";
import Mustache from "mustache";
import config from "../config";

const lpush = promisify(redisClient.lpush).bind(redisClient);

export type MailPayload = {
  subject: string;
  message: string;
  recipients: string[];
};

export const createMailTask = async (payload: MailPayload) => {
  const listName = process.env.REDIS_KEY || 'tasks';
  await lpush(listName, JSON.stringify(payload));
};

export async function processMailSend(data: Prisma.FeedbackCreateInput) {
  if (data.score <= 1 || data.username) {
    try {
      const configDb = await prisma.config.findMany();
      const emailTemplate = configDb.find((config) => config.key === "emailTemplate")?.value || config.defaultEmailTemplate ;  
      const recipients = [configDb.find((config) => config.key === "emailAddress")?.value] || [config.defaultEmailAddress] ;
      const subject = configDb.find((config) => config.key === "emailSubject")?.value || config.defaultEmailSubject ;
      const message = Mustache.render(emailTemplate, data);
      await createMailTask({ subject, message, recipients });
    } catch (err) {
      console.log("Unable to process mail send", err);
    }
  }
}
