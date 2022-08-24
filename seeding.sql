BEGIN;

TRUNCATE TABLE "user" CASCADE;

INSERT INTO "user" ("email", "firstname", "lastname", "category")
VALUES
('l.seraline@gmail.com', 'Laurent', 'Séraline', 'ADMIN'),
('b.gerometta@gmail.com', 'Bastien', 'Gerometta', 'MEMBER'),
('ml.bernat@gmail.com', 'Marie-Laure', 'Bernat', 'MEMBER'),
('j.olivier@gmail.com', 'Johann', 'Olivier', 'PLAYER')
;

COMMIT;