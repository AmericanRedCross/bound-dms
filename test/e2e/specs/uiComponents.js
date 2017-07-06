// A test to ensure the main UI components are rendering

module.exports = {
  'Navbar, sidebar and routerview exists': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#app', 1000)
      .expect.element('.navbar').to.be.present
    browser.expect.element('.sidebar').to.be.present
    browser.expect.element('.main-view').to.be.present
    browser.end()
  }
}
