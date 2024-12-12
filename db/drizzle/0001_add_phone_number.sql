ALTER TABLE "user" ADD COLUMN "phoneNumber" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "phoneNumberVerified" boolean NOT NULL SET DEFAULT false;