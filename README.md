# arc-cim-frontend

> ARC Cash In Emergencies Web Application

## Build Setup

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

# run all tests
npm test
```

## Docker Container

```bash
# Build Container
docker build . --tag cie:latest

# Run Container
docker run -p 80:80 -it --rm --name cie cie:latest
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
