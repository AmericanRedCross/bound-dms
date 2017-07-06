// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'change to french': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .click('#french')
      .pause(1000)
      .assert.containsText('#changeText', 'Bienvenue dans votre application Vue.js')
      .end()
  },

  'change to german': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .click('#german')
      .pause(1000)
      .assert.containsText('#changeText', 'Willkommen bei deiner Vue.js App')
      .end()
  },

  'change to spanish': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .click('#spanish')
      .pause(1000)
      .assert.containsText('#changeText', 'Bienvenido a la aplicación Vue.js')
      .end()
  },

  'right no. of languages': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .pause(1000)
      .assert.elementCount('.nav-item', 4)
      .end()
  },
}
