// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'check english selector present': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
<<<<<<< HEAD
      .click('#lang-select')
      .click('#french')
      .pause(500)
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
      .click('#lang-select')
      .click('#german')
      .pause(500)
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
      .click('#lang-select')
      .click('#spanish')
      .pause(500)
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
      .pause(500)
      .assert.elementCount('.lang-item', 4)
      .end()
  }
=======
      .waitForElementVisible('#app', 1000)
    browser.expect.element('#lang-select').to.be.present
    browser.expect.element('#english').to.be.present
  }

>>>>>>> Removed additional language tests
}
