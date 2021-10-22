import { Feedback } from ".prisma/client";

export type Response =
  | "very unhappy"
  | "unhappy"
  | "neutral"
  | "happy"
  | "very happy";

export type FeedbackResults = {
  totalFeedbackCount: number,
  feedbackResults: Feedback,
};