module.exports = {
  'User Table renders with search box': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer + '/users')
      .waitForElementVisible('#app', 1000)
      .expect.element('.users').to.be.present
    browser.expect.element('#userTable').to.be.present
    browser.expect.element('#userSearch').to.be.present
    browser.end()
  }
}
