# Bound document management system

> Bound is a document management system allowing collaboration and control of document translation projects. It supports content distribution via REST API
and static file downloads.

## Resources

 - [iOS SDK](https://github.com/3sidedcube/arc-cie-ios-client)
 - [Android SDK](https://github.com/3sidedcube/dmssdk-android-framework)
 - [Bound on Docker Hub](https://hub.docker.com/r/3sidedcube/arc-cim-frontend/)

## Developement Environment Setup

### Docker Compose

[Download and install Docker](https://www.docker.com) for your platform.

Docker Compose is used to run the webpack dev server for development,
together with the API and associated services e.g. MySQL database.

```bash
# Run all services for development
docker-compose up
sh ./migrate.sh
```
The application should then be accessible on the host machine at `http://localhost:8080`

### Testing

Tests can be run using the following command

```bash
docker-compose run server npm run test:server
```

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

## Publishing Content

```bash
docker-compose run server node publish.js <projectId> <languageCode>
```

### Docker Container Builds

The docker container can be built from the project. At build time all files are
copied into the container. Dependencies are freshly installed and the project
is built for production. Dev dependencies are then removed. When the container
is run, it will statically serve the built frontend and the API service.

```bash
# Build Container
docker build . --tag bound-dms:latest

# Run Container
docker run -p 80:80 -it --rm --name bound-dms bound-dms:latest
```

## Bound app languages

Bound uses the [i18next](i18next.com) vue [plugin](https://kazupon.github.io/vue-i18n/) to manage strings within the application.

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

## Bound user status

In Bound a user can be set as inactive or active. An active user can log into the system whereas an inactive user will not be able to log in. To set this go to the user list page, edit a user and set the active state.

## Document translations

To translate an uploaded document it must be assigned to a directory. Once assigned, select "Translations" from the sidebar and select the language you wish to translate to.

On the following page (the translation workflow) the left column is a reference to the base language, the right is the language you are translating.

You will notice that the document assigned to a directory is visible here. Select the "edit" button to go to the document translation page.

On the documentation translation page the document is split up into paragraphs, here you can edit (in markdown format) the translation of a document.

## Contributing to Bound

Contributions to Bound are welcome! Please submit changes via pull request and check the project issues for ways to contribute.

## License

BSD 3-Clause License
Copyright (c) 2017, 3 SIDED CUBE
All rights reserved.
Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
* Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.
* Neither the name of the copyright holder nor the names of its
  contributors may be used to endorse or promote products derived from
  this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
