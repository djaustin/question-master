import { Config } from "@prisma/client";
import { NextApiHandler } from "next";
import prisma from "../../integrations/db";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    const transactions = req.body
      .filter(
        (config: Config) => config.value != null && config.value != undefined
      )
      .map((config: Config) =>
        prisma.config.upsert({
          where: { key: config.key },
          create: config,
          update: {
            value: config.value,
          },
        })
      );
    try {
      await Promise.all(transactions);
      res.status(200);
      return res.end();
    } catch (err) {
      res.status(500).send(err);
    }
  }
  if (req.method === "GET") return res.json(await prisma.config.findMany());
};

export default handler;
