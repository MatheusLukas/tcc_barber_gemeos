CREATE TYPE "public"."role" AS ENUM('admin', 'user', 'collaborator');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "barbers" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"role" "role" NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "jobs" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"price" double precision NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "payments" (
	"id" text PRIMARY KEY NOT NULL,
	"paymentMethod" text NOT NULL,
	"price" double precision NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "schedule" (
	"id" uuid PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"barberId" text NOT NULL,
	"date" timestamp NOT NULL,
	"type" text NOT NULL,
	"value" double precision NOT NULL,
	"paymentMethod" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "stock" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"quantity" integer NOT NULL,
	"unityPrice" double precision NOT NULL,
	"image" text
);
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "role" "role" NOT NULL;