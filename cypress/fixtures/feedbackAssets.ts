import { Feedback } from "@prisma/client";
import dayjs from "dayjs";

const feedbackResults: Feedback[] = [
  {
    id: 1,
    username: "tk44b4",
    score: 1,
    updatedAt: new Date(),
    createdAt: new Date(),
    comment: "Comment 1",
    deviceIp: "127.0.0.1",
  },
  {
    id: 2,
    username: "ggr555",
    score: 1,
    updatedAt: new Date(),
    createdAt: new Date(),
    comment: "Comment 2",
    deviceIp: "127.0.0.1",
  },
  {
    id: 3,
    username: "hjg8585",
    score: 1,
    updatedAt: new Date(),
    createdAt: new Date(),
    comment: "Comment 3",
    deviceIp: "127.0.0.1",
  },
  {
    id: 4,
    username: "ak4855",
    score: 2,
    updatedAt: new Date(),
    createdAt: new Date(),
    comment: "Comment 4",
    deviceIp: "127.0.0.1",
  },
  {
    id: 5,
    username: "fgjh585",
    score: 3,
    updatedAt: new Date(),
    createdAt: new Date(),
    comment: "Comment 5",
    deviceIp: "127.0.0.1",
  },
  {
    id: 6,
    username: "ff5563",
    score: 3,
    updatedAt: new Date(),
    createdAt: new Date(),
    comment: "Comment 6",
    deviceIp: "127.0.0.1",
  },
  {
    id: 7,
    username: "fd5555",
    score: 4,
    updatedAt: new Date(),
    createdAt: new Date(),
    comment: "Comment 7",
    deviceIp: "127.0.0.1",
  },
  {
    id: 8,
    username: "jkkj666",
    score: 4,
    updatedAt: new Date(),
    createdAt: new Date(),
    comment: "Comment 8",
    deviceIp: "127.0.0.1",
  },
  {
    id: 9,
    username: "aa33333",
    score: 5,
    updatedAt: new Date(),
    createdAt: new Date(),
    comment: "Comment 9",
    deviceIp: "127.0.0.1",
  },
  {
    id: 10,
    username: "ku87876",
    score: 5,
    updatedAt: new Date(),
    createdAt: new Date(),
    comment: "Comment 10",
    deviceIp: "127.0.0.1",
  },
];

const feedbackData = {
  feedbackResults: feedbackResults,
  totalFeedbackCount: 10,
}

const defaultDatePickerText = `${dayjs().subtract(1, 'day').format("MM/DD/YYYY")} - ${dayjs(new Date()).format("MM/DD/YYYY")}`;

export { feedbackData, defaultDatePickerText };
