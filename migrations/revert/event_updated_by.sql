-- Revert atdj:event_updated_by from pg

BEGIN;

ALTER TABLE "event"
DROP COLUMN "updated_by";

COMMIT;
