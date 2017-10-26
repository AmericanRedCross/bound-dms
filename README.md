# Bound document management system

> ARC Bound Web Application

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

## Bound app languages

Bound used the [i18next](i18next.com) vue [plugin](https://kazupon.github.io/vue-i18n/) to manage strings within the application.

Any new piece of text should be added to the base language file, by default it is located at `src/assets/locales/en/index.js`

Any new language files should be added to `src/assets/locales/` and registered in `src/assets/locales/index.js`

By default the language picker is located in the Bound's navigation bar and is hidden. To enable it, remove the `v-if="false"` statement from this code block in `src/components/ui/Navbar.vue`:

```html
<!-- Language dropdowns -->
<b-nav-item-dropdown :text="$t('navbar.language')" id="lang-select" right v-if="false">
  <b-dropdown-item class="lang-item" id="english" v-bind:class="{ selected: isActive('en') }" v-on:click="langChange('en')">English</b-dropdown-item>
  <b-dropdown-item class="lang-item" id="french" v-bind:class="{ selected: isActive('fr') }" v-on:click="langChange('fr')">Français</b-dropdown-item>
  <b-dropdown-item class="lang-item" id="german" v-bind:class="{ selected: isActive('de') }" v-on:click="langChange('de')">Deutsche</b-dropdown-item>
  <b-dropdown-item class="lang-item" id="spanish" v-bind:class="{ selected: isActive('es') }" v-on:click="langChange('es')">Español</b-dropdown-item>
</b-nav-item-dropdown>
```

This dropdown also contains the needed links to change the language. Upon clicking one, the langChange method is called which tells i18n what the current app language is.

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

## Publishing

```bash
docker-compose run server node publish.js <projectId> <languageCode>
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
