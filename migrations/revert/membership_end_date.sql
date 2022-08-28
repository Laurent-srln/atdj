-- Revert atdj:membership_end_date from pg

BEGIN;

ALTER TABLE "membership"
DROP COLUMN "end_date";

COMMIT;
