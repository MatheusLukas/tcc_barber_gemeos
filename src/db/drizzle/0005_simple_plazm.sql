ALTER TABLE "schedule" RENAME COLUMN "userId" TO "user_id";--> statement-breakpoint
ALTER TABLE "schedule" RENAME COLUMN "barberId" TO "barber_id";--> statement-breakpoint
ALTER TABLE "schedule" RENAME COLUMN "jobId" TO "job_id";--> statement-breakpoint
ALTER TABLE "schedule" RENAME COLUMN "paymentMethod" TO "payment_method";--> statement-breakpoint
ALTER TABLE "stock" RENAME COLUMN "unityPrice" TO "unity_price";--> statement-breakpoint
ALTER TABLE "user" RENAME COLUMN "emailVerified" TO "email_verified";--> statement-breakpoint
ALTER TABLE "user" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "user" RENAME COLUMN "updatedAt" TO "updated_at";--> statement-breakpoint
ALTER TABLE "user" RENAME COLUMN "phoneNumber" TO "phone_number";--> statement-breakpoint
ALTER TABLE "user" RENAME COLUMN "phoneNumberVerified" TO "phone_number_verified";--> statement-breakpoint
ALTER TABLE "schedule" DROP CONSTRAINT "schedule_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "schedule" DROP CONSTRAINT "schedule_barberId_barbers_id_fk";
--> statement-breakpoint
ALTER TABLE "schedule" DROP CONSTRAINT "schedule_jobId_jobs_id_fk";
--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "role" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "role" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "session" ADD COLUMN "impersonated_by" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "banned" boolean;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "ban_reason" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "ban_expires" timestamp;--> statement-breakpoint
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_barber_id_barbers_id_fk" FOREIGN KEY ("barber_id") REFERENCES "public"."barbers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_job_id_jobs_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."jobs"("id") ON DELETE no action ON UPDATE no action;