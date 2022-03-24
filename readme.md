# NOBI Recruitment Test for Backend Software Engineer

## Project Setup

### 0. Prerequisites

- Docker >= v19.03
- MySQL >= v8.0
- NPM >= 8.1.2

### 1. Dependencies

- Clone this repository and change directory into the project root.
- Run `make init`. This will make copy of `.env.example` to file called `.env`.
- Change the value in `.env` and `config.json` file to correct one to setup your database config, environment, etc.
- Run `npm install`.

### 2. Running Development Server

- Make sure you have a run MySql Server in local.
- Run `npm run serve`. This will check the database connection first, if connected, the server will run and initialize all table that not existed in the database yet.
- Run `make run_migration` to update database migrations to the latest version.
- Optional: run `make run_seed` to seeding database with test data.
