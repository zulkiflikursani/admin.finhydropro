import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const company1 = await prisma.users.upsert({
    where: { email: "company1@prisma.io" },
    update: {},
    create: {
      email: "company1@gmail.com",
      accessToken: "asfasfadfa",
      nama: "perusahaan 1",
      level: "2",
      company: "1",
      no_telpon: "12313123123123",
      password: "123123123",
      refreshToken: "adfadfasdf",
    },
  });
  const company2 = await prisma.users.upsert({
    where: { email: "company2@prisma.io" },
    update: {},
    create: {
      email: "company2@gmail.com",
      accessToken: "asfasfadfa",
      nama: "perusahaan 2",
      level: "2",
      company: "2",
      no_telpon: "12313123123123",
      password: "123123123",
      refreshToken: "adfadfasdf",
    },
  });

  console.log({ company1, company2 });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
