ALTER TABLE "user" ALTER COLUMN "role" SET DATA TYPE role;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "role" SET NOT NULL;--> statement-breakpoint
DROP TYPE "public"."paymentMethod";