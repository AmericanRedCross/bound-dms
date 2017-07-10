// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'Empty email message shown': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
    .url(devServer + '/login')
    .waitForElementVisible('.login', 5000)
    browser.setValue('#email-input', ' ')
    browser.clearValue('#email-input')
    .assert.containsText('#email-error', 'The email field is required.')
    browser.setValue('#email-input', 'test')
    browser.clearValue('#email-input')
    browser.setValue('#email-input', '')
    .assert.containsText('#email-error', 'The email field is required.')
    .end()
  },

  'Invalid email message shown': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
    .url(devServer + '/login')
    .waitForElementVisible('.login', 5000)
    browser.setValue('#email-input', 'test')
    .assert.containsText('#email-error', 'The email field must be a valid email.')
    .end()
  },

  'Empty password message shown': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
    .url(devServer + '/login')
    .waitForElementVisible('.login', 5000)
    browser.setValue('#password-input', ' ')
    browser.clearValue('#password-input')
    .assert.containsText('#password-error', 'The password field is required.')
    .end()
  }
}
