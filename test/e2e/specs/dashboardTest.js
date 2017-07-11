// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'check charts present': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer + '/dashboard')
      .waitForElementVisible('.dashboard', 5000)
      .assert.elementCount('.card', 3)
      .assert.elementCount('.small', 3)
      .end()
  },

  'check chart text': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer + '/dashboard')
      .waitForElementVisible('.dashboard', 5000)
      .pause(1000)
      .assert.containsText('#card1', 'Test Chart 1')
      .assert.containsText('#card2', 'Test Chart 2')
      .assert.containsText('#card3', 'Test Chart 3')
      .end()
  }

}
