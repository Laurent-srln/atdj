-- Deploy atdj:event_updated_by to pg

BEGIN;

ALTER TABLE "event"
ADD COLUMN "updated_by" int;

COMMIT;
