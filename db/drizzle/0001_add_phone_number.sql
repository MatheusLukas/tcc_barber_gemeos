ALTER TABLE "user" ADD COLUMN "phoneNumber" text;
ALTER TABLE "user" ADD COLUMN "phoneNumberVerified" boolean NOT NULL SET DEFAULT false;