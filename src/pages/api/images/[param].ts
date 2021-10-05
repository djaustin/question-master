import { createProxyMiddleware } from "http-proxy-middleware";
import { PageConfig } from "next";

const handler = createProxyMiddleware({
  target: process.env.FILEPILE_BASE_URL,
  pathRewrite: { ["^/api/images"]: "" },
  logLevel: "debug",
});

export const config: PageConfig = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
export default handler;
