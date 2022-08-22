BEGIN;

TRUNCATE TABLE "coach_has_specialty" CASCADE;

TRUNCATE TABLE "user" CASCADE;

TRUNCATE TABLE "specialty" CASCADE;

TRUNCATE TABLE "workout" CASCADE;

TRUNCATE TABLE "comment" CASCADE;

TRUNCATE TABLE "health" CASCADE;

TRUNCATE TABLE "coaching" CASCADE;



INSERT INTO "user" ("email", "firstname", "lastname", "category")
VALUES
('l.seraline@gmail.com', 'Laurent', 'Séraline', 'ADMIN'),
('b.gerometta@gmail.com', 'Bastien', 'Gerometta', 'MEMBER'),
('ml.bernat@gmail.com', 'Marie-Laure', 'Bernat', 'MEMBER'),
('j.olivier@gmail.com', 'Johann', 'Olivier', 'PLAYER')
;

COMMIT;