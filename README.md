# arc-cim-frontend

> ARC Cash In Emergencies Web Application

## Frontend Environment Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run server tests (requires a fresh migration each time)
sh ./migrate.sh && docker-compose run server npm run test:server

# run all tests
npm test
```

## Backend Environment Setup

### Docker Compose

Docker compose is used to run the webpack dev server for development,
together with the API and associated services e.g. database.

```bash
# Run all services for development
docker-compose up
sh ./migrate.sh
```
The application should then be accessible on the host machine at `http://localhost:80`

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

#### OSX Caveat

bcrypt and sharp compiled on OSX will not work on Linux

The solution is to run:

```bash
docker-compose run server rm -r node_modules
docker-compose run server npm install
```
Should this not solve the problem, try the following:

```bash
docker-compose run server npm rebuild bcrypt --update-binary
docker-compose run server npm rebuild sharp
```

### Docker Container

The docker container can be built from the project. At build time all files are
copied into the container. Dependencies are freshly installed and the project
is built for production. Dev dependencies are then removed. When the container
is run, it will statically serve the built frontend and the API service.

```bash
# Build Container
docker build . --tag cie:latest

# Run Container
docker run -p 80:80 -it --rm --name cie cie:latest
```

