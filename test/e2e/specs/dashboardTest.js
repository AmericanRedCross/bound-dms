// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'check charts present': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer + '/#/dashboard')
      .waitForElementVisible('.dashboard', 5000)
      .assert.elementCount('.card', 3)
      .assert.elementCount('.small', 3)
      .end()
  },

  'check french chart translations': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer + '/#/dashboard')
      .waitForElementVisible('.dashboard', 5000)
      .click('#lang-select')
      .click('#french')
      .pause(1000)
      .assert.containsText('#card1', 'Test Graphique 1')
      .assert.containsText('#card2', 'Test Graphique 2')
      .assert.containsText('#card3', 'Test Graphique 3')
      .end()
  },

  'check german chart translations': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer + '/#/dashboard')
      .waitForElementVisible('.dashboard', 5000)
      .click('#lang-select')
      .click('#german')
      .pause(1000)
      .assert.containsText('#card1', 'Testdiagramm 1')
      .assert.containsText('#card2', 'Testdiagramm 2')
      .assert.containsText('#card3', 'Testdiagramm 3')
      .end()
  },

  'check spanish chart translations': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer + '/#/dashboard')
      .waitForElementVisible('.dashboard', 5000)
      .click('#lang-select')
      .click('#spanish')
      .pause(1000)
      .assert.containsText('#card1', 'Tabla de Prueba 1')
      .assert.containsText('#card2', 'Tabla de Prueba 2')
      .assert.containsText('#card3', 'Tabla de Prueba 3')
      .end()
  }
}
