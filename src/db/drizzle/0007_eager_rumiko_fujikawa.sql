CREATE TABLE "scheduleHasJobs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"schedule_id" uuid NOT NULL,
	"job_id" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "schedule" DROP CONSTRAINT "schedule_job_id_jobs_id_fk";
--> statement-breakpoint
ALTER TABLE "scheduleHasJobs" ADD CONSTRAINT "scheduleHasJobs_schedule_id_schedule_id_fk" FOREIGN KEY ("schedule_id") REFERENCES "public"."schedule"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "scheduleHasJobs" ADD CONSTRAINT "scheduleHasJobs_job_id_jobs_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."jobs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "schedule" DROP COLUMN "type";--> statement-breakpoint
ALTER TABLE "schedule" DROP COLUMN "job_id";