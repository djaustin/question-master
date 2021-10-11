const faker = require("faker");
const Prisma = require("@prisma/client");

const prisma = new Prisma.PrismaClient();
const seed = async () => {
  let data = [];
  for (let index = 0; index < 100; index++) {
    const randomIP = faker.internet.ip();
    const feedback = {
      comment: faker.lorem.sentence(),
      createdAt: faker.date.recent(5),
      updatedAt: faker.date.recent(3),
      score: faker.datatype.number(4) + 1,
      username: faker.internet.userName(),
      device: {
        connectOrCreate: {
          create: {
            ip: randomIP,
            hostname: faker.internet.domainName(),
            location: faker.address.city(),
          },
          where: {
            ip: randomIP,
          },
        },
      },
    };
    data.push(feedback);
  }
  for (const item of data) {
    await prisma.feedback.create({
      data: item,
    });
  }
};

seed()
  .then(() => console.log("done"))
  .catch((err) => console.error(err));
