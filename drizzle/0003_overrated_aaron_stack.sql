ALTER TABLE "my-workouts_routine" DROP COLUMN IF EXISTS "status";


DO $$ BEGIN
 CREATE TYPE "public"."status" AS ENUM('fav', 'archived', 'active');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "my-workouts_routine" ADD COLUMN "status" status DEFAULT 'active' NOT NULL;