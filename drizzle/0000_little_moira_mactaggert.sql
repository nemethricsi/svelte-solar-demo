CREATE TYPE "public"."project_status" AS ENUM('not_started', 'in_progress', 'completed');--> statement-breakpoint
CREATE TABLE "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"status" "project_status" DEFAULT 'not_started',
	"user_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
