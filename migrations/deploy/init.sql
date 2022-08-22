-- Deploy atdj:init to pg

BEGIN;

CREATE DOMAIN posint AS int CHECK (value > 0);

CREATE TABLE "user" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "email" text UNIQUE NOT NULL,
    "firstname" text NOT NULL,
    "lastname" text NOT NULL,
    "password" text,
    "token" text,
    "category" text NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz
);

CREATE TABLE "boardgame" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" text UNIQUE NOT NULL,
    "description" text NOT NULL,
    "duration" posint NOT NULL,
    "min_players" posint NOT NULL,
    "max_players" posint NOT NULL,
    "quantity" posint NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz
);

CREATE TABLE "event" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "date" date NOT NULL,
    "description" text NOT NULL,
    "created_by" int NOT NULL REFERENCES "user"(id),
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz
);

CREATE TABLE "game" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "boardgame_id" int NOT NULL REFERENCES "boardgame"(id),
    "date" date NOT NULL,
    "comment" text,
    "created_by" int NOT NULL REFERENCES "user"(id),
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz
);

CREATE TABLE "player" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "game_id" int NOT NULL REFERENCES "game"(id) ON DELETE CASCADE,
    "user_id" int NOT NULL REFERENCES "user"(id),
    "winner" boolean, 
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz
);

CREATE TABLE "loan" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "user_id" int NOT NULL REFERENCES "user"(id),
    "boardgame_id" int NOT NULL REFERENCES "boardgame"(id),
    "loan_date" date NOT NULL,
    "return_date" date NOT NULL,
    "return_by" int REFERENCES "user"(id),
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz
);

CREATE TABLE "attendance" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "event_id" int NOT NULL REFERENCES "event"(id) ON DELETE CASCADE,
    "user_id" int NOT NULL REFERENCES "user"(id),
    "payment_verification" int REFERENCES "user"(id),
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz
);

CREATE TABLE "membership" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "user_id" int NOT NULL REFERENCES "user"(id),
    "start_date" date NOT NULL,
    "created_by" int REFERENCES "user"(id),
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz
);

COMMIT;
