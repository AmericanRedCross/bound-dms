// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {

  'check incorrect validation prevents save': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer + '/users/edit/1')
      .waitForElementVisible('.user-edit', 5000)
      .pause(5000)
      .setValue('user.email[type=email]', 'user@domain')
      .end()
  }

}
