CREATE TABLE IF NOT EXISTS "my-workouts_account" (
	"userId" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"provider" varchar(255) NOT NULL,
	"providerAccountId" varchar(255) NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" varchar(255),
	"scope" varchar(255),
	"id_token" text,
	"session_state" varchar(255),
	CONSTRAINT "my-workouts_account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "my-workouts_exercise_entry" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"template_id" uuid,
	"weight" integer,
	"repetitions" integer,
	"created_at" date DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "my-workouts_exercise_template" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"routine_id" uuid,
	"name" varchar(256) NOT NULL,
	"description" text,
	"group" varchar(256),
	"series_max" integer,
	"series_min" integer NOT NULL,
	"repetition_max" integer,
	"repetition_min" integer NOT NULL,
	"date" date DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" date
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "my-workouts_routine" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(256) NOT NULL,
	"status" text DEFAULT 'active' NOT NULL,
	"date" date DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "my-workouts_session" (
	"sessionToken" varchar(255) PRIMARY KEY NOT NULL,
	"userId" varchar(255) NOT NULL,
	"expires" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "my-workouts_user" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"email" varchar(255) NOT NULL,
	"emailVerified" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"image" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "my-workouts_verificationToken" (
	"identifier" varchar(255) NOT NULL,
	"token" varchar(255) NOT NULL,
	"expires" timestamp with time zone NOT NULL,
	CONSTRAINT "my-workouts_verificationToken_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "my-workouts_account" ADD CONSTRAINT "my-workouts_account_userId_my-workouts_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."my-workouts_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "my-workouts_exercise_entry" ADD CONSTRAINT "my-workouts_exercise_entry_template_id_my-workouts_exercise_template_id_fk" FOREIGN KEY ("template_id") REFERENCES "public"."my-workouts_exercise_template"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "my-workouts_exercise_template" ADD CONSTRAINT "my-workouts_exercise_template_routine_id_my-workouts_routine_id_fk" FOREIGN KEY ("routine_id") REFERENCES "public"."my-workouts_routine"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "my-workouts_session" ADD CONSTRAINT "my-workouts_session_userId_my-workouts_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."my-workouts_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "account_userId_idx" ON "my-workouts_account" ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "routine_name_idx" ON "my-workouts_routine" ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "session_userId_idx" ON "my-workouts_session" ("userId");