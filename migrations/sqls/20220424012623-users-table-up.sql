CREATE TABLE "users" (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(64) NOT NULL,
  last_name VARCHAR(64),
  username VARCHAR(64) NOT NULL,
  password TEXT NOT NULL
);