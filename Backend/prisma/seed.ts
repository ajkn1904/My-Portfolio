import { prisma } from "../src/config/db";

import bcrypt from "bcryptjs";

//to seed the data to cloud: npx ts-node prisma/seed.ts



async function main() {
  const adminEmail = process.env.ADMIN_EMAIL as string;
  const adminPassword = process.env.ADMIN_PASSWORD  as string; 


  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.log("Admin already exists:", existingAdmin.email);
    return;
  }


  const saltRounds = parseInt(process.env.SALT_ROUND as string);
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(adminPassword, salt);




  const admin = await prisma.user.create({
    data: {
      name: "ANIKA JUMANA KHANAM NISHAT",
      email: adminEmail,
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("Admin user created successfully:", admin.email);
}

main()
  .catch((e) => {
    console.error("Error seeding admin:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
