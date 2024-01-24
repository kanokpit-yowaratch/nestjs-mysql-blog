<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
  <a href="https://expressjs.com/" target="blank"><img src="https://avatars.githubusercontent.com/u/5658226?s=120" width="120" alt="Express Logo" />
  </a>
  <a href="https://www.typescriptlang.org/docs/" target="blank"><img src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/typescript/typescript.png" width="120" alt="TypeScript Logo" />
  </a>
</p>

## nestjs-mysql-blog

<!-- [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository. -->
This is a blog's `api` application created by NestJS



## Tech Stack

  `NestJS` `Express` `TypeScript`


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## PM2 command


```bash
# build to create dist/main.js
$ npm run build

# pm2 to start api service
$ pm2 start dist/main.js --name "nestjs-api"
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Configuration file
**`.env`** file as follows:
<ul>
<li>API_PORT=[avoid 5000]</li>
<li>DB_HOST=localhost</li>
<li>DB_PORT=3306</li>
<li>DB_USERNAME=</li>
<li>DB_PASSWORD=</li>
<li>DB_DATABASE=</li>
</ul>

## Demo

[kanokpit.com](https://kanokpit.com)

## Client example

Client blog repo: [nextjs-client-blog](https://github.com/kanokpit-yowaratch/nextjs-client-blog)
