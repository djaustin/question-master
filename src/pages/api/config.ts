import { Config } from "@prisma/client";
import { NextApiHandler } from "next";
import prisma from "../../integrations/db";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    req.body
      .filter((config: Config) => config.value)
      .forEach(
        async (config: Config) =>
          await prisma.config.upsert({
            where: { key: config.key },
            create: config,
            update: {
              value: config.value,
            },
          })
      );
    res.status(200);
    return res.end();
  }
  if (req.method === "GET") return res.json(await prisma.config.findMany());
};

export default handler;
