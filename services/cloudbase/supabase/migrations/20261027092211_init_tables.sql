-- CreateEnum
CREATE TYPE "savour"."Role" AS ENUM ('USER', 'ADMINISTRATOR', 'DEVELOPER', 'CONTENT_MANAGER');

-- CreateTable
CREATE TABLE "savour"."profiles" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "user_name" TEXT,
    "avatar" TEXT,
    "customized" BOOLEAN NOT NULL DEFAULT false,
    "role" "savour"."Role" NOT NULL DEFAULT 'USER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "savour"."folders" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "folder_id" TEXT,
    "profile_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "folders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profiles_email_key" ON "savour"."profiles"("email");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_user_name_key" ON "savour"."profiles"("user_name");

-- AddForeignKey
ALTER TABLE "savour"."folders" ADD CONSTRAINT "folders_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "savour"."profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
