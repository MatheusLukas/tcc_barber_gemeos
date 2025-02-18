CREATE TYPE "public"."paymentMethod" AS ENUM('cash', 'card', 'pix');--> statement-breakpoint
ALTER TABLE "jwks" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "payments" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "jwks" CASCADE;--> statement-breakpoint
DROP TABLE "payments" CASCADE;--> statement-breakpoint
ALTER TABLE "schedule" DROP CONSTRAINT "schedule_paymentMethod_payments_paymentMethod_fk";
