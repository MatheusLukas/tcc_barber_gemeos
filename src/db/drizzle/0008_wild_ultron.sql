CREATE TYPE "public"."status" AS ENUM('pending', 'confirmed', 'canceled', 'refunded', 'no_payed');--> statement-breakpoint
ALTER TABLE "schedule" ADD COLUMN "status" "status" NOT NULL;