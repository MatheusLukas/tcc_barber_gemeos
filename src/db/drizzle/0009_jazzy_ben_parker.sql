ALTER TABLE "schedule" DROP CONSTRAINT "schedule_price_jobs_price_fk";
--> statement-breakpoint
ALTER TABLE "schedule" ADD COLUMN "jobId" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "schedule" ADD CONSTRAINT "schedule_jobId_jobs_id_fk" FOREIGN KEY ("jobId") REFERENCES "public"."jobs"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
