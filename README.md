# Question Master

[![Maintainability](https://api.codeclimate.com/v1/badges/433152fe4298594d0a99/maintainability)](https://codeclimate.com/github/djaustin/question-master/maintainability)

A customisable experience sampling application with a live results viewer

## Deployment

To deploy this project, pull the Docker image and run it with the appropriate environment variables to connect to a database.

### Running a container

The container runs on port 80 and requires the environment variable DATABASE_URL described below

An example run command is:

```bash
  docker container run -p 8080:80 -e DATABASE_URL=postgres://postgres:secret_password@localhost:5432/question-master -e LOCAL_USERNAME=admin -e LOCAL_PASSWORD=admin daustin/question-master:latest
```

## Run Locally

Clone the project

```bash
  git clone https://github.com/djaustin/question-master.git
```

Go to the project directory

```bash
  cd question-master
```

Install dependencies

```bash
  yarn
```

Start dependency services

```bash
  docker compose up
```

Start the server

```bash
  yarn dev
```

## Running Tests

To run jest tests, run the following command

```bash
  yarn test
```

To run Cypress tests, run the following command

```bash
  yarn test:e2e
```

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env.local` file

`DATABASE_URL`: The connection string for the database in which feedback will be stored

## Tech Stack

**Client:** React, Chakra UI

**Server:** NextJS, Prisma

## Authors

- [@djaustin](https://www.github.com/djaustin)
- [@tigs1995](https://www.github.com/tigs1995)
- [@annabelkimber](https://www.github.com/annabelkimber)
- [@hh0ang](https://www.github.com/hh0ang)