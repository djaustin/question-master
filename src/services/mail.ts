import { Prisma } from "@prisma/client";
import { promisify } from "util";
import { redisClient } from "../integrations/redis";
import prisma from "../integrations/db";
import Mustache from "mustache";
const defaultEmailTemplate = 
`
<p>Feedback has been received:</p>
  <ul>
    <li>Score:&nbsp;<strong>{{score}}</strong></li>
    <li>Comment:&nbsp;<strong>{{comment}}</strong></li>
    <li>Username:&nbsp;<strong>{{username}}</strong></li>
  </ul>;
`
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
      const config = await prisma.config.findMany();
      const emailTemplate = config.find((config) => config.key === "emailTemplate")?.value || defaultEmailTemplate 
      const recipients = [config.find((config) => config.key === "emailAddress")?.value] || process.env.MAIL_RECIPIENTS?.split(",");
      const subject = config.find((config) => config.key === "emailSubject")?.value || process.env.MAIL_SUBJECT || "User feedback received";
      const message = Mustache.render(emailTemplate, data);
      console.log(data)
      console.log(emailTemplate)
      console.log(message)
      await createMailTask({ subject, message, recipients });
    } catch (err) {
      console.log("Unable to process mail send", err);
    }
  }
}
