-- Deploy atdj:membership_end_date to pg

BEGIN;

ALTER TABLE "membership"
ADD COLUMN "end_date" date;

COMMIT;
