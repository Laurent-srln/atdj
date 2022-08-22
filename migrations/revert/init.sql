-- Revert osport:init from pg

BEGIN;

DROP TABLE "membership";

DROP TABLE "attendance";

DROP TABLE "loan";

DROP TABLE "player";

DROP TABLE "game";

DROP TABLE "event";

DROP TABLE "boardgame";

DROP TABLE "user";

DROP DOMAIN posint;

COMMIT;
