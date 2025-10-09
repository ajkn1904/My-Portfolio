-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminInfo" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "name" TEXT NOT NULL DEFAULT 'Anika Jumana Khanam Nishat',
    "email" TEXT NOT NULL DEFAULT 'ajknishat@gmail.com',
    "officialEmail" TEXT NOT NULL DEFAULT 'anika.nishat06@gmail.com',
    "contact" TEXT NOT NULL DEFAULT '+8801521228030',
    "photoUrl" TEXT,
    "address" TEXT NOT NULL DEFAULT 'Chattogram, Bangladesh',
    "institution" TEXT NOT NULL DEFAULT 'Premier University, Chittagong, Bangladesh',
    "degree" TEXT NOT NULL DEFAULT 'BSc. in Computer Science and Engineering',
    "cgpa" DOUBLE PRECISION NOT NULL DEFAULT 3.96,
    "github" TEXT NOT NULL DEFAULT 'https://github.com/ajkn1904',
    "linkedin" TEXT NOT NULL DEFAULT 'https://www.linkedin.com/in/anika-jumana-khanam/',
    "stackoverflow" TEXT NOT NULL DEFAULT 'https://stackoverflow.com/users/19951395/ajkn',
    "experiences" JSONB,
    "skills" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");


