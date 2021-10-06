import { createProxyMiddleware } from "http-proxy-middleware";
import { PageConfig } from "next";

const handler = createProxyMiddleware({
  target: process.env.FILEPILE_BASE_URL,
  secure: false,
  pathRewrite: { ["^/api/images"]: "" },
});

export const config: PageConfig = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
export default handler;
