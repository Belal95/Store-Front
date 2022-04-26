# Store Front backend

## How to use the application

1. Add `.env` file to the root folder

Example .env

    ```
    PORT=3000
    DB_PORT=5432
    ENV=dev
    POSTGRES_HOST=127.0.0.1
    POSTGRES_DB=store_dev
    POSTGRES_TEST_DB=store_test
    POSTGRES_USER=store_user
    POSTGRES_PASSWORD=password123
    BCRYPT_PASSWORD=my_ultimate_salt_password
    SALT_ROUNDS=10
    TOKEN_SECRET=alcantara123!
    ```

---

2. Create dev database, test databse & postgress user as follow

- Using postgres root run the following queries
  - use run `CREATE USER store_user WITH PASSWORD 'password123';` to creat the database user
  - run `CREATE DATABASE store_dev;` & `CREATE DATABASE stor_test;` to create the dev & test databases
  - run `GRANT ALL PRIVILEGES ON DATABASE store_dev TO store_user` to give created user access to dev database
  - run `GRANT ALL PRIVILEGES ON DATABASE store_test TO store_user` to give created user access to test database

---

3. Run `yarn` in the console to install node packages

---

4. Run `db-migrate up` to run database migrations

---

5. Run `yarn watch` to start the server on port 3000

---

6. Run `yarn test` to run the test suites

---

- Note: The backend is runing on port 3000 & the database on port: 5432

---

## Database Schema

- Check the REQUIREMENTS.md for a the database schema

---

## Routes

- Check the REQUIREMENTS.md for the routes paths
