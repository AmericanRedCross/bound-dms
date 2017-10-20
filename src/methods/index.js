// We have to import images we want to use for a srcset.. it appears vue-loader
// has a PR for this to fix it but is yet to be merged.
// https://github.com/vuejs/vue-loader/pull/953
// The issue is described here and an import of the images is the current workaround for this.
// https://github.com/vuejs-templates/webpack/issues/396
let logos = {
  x1: require('../assets/img/bound.png'),
  x2: require('../assets/img/bound@2x.png'),
  x3: require('../assets/img/bound@3x.png')
}

/*
 * Vue Methods, common throughout the app
 */
const methods = {
  isImage (file) {
    if (file.mimeType) {
      return file.mimeType.match(`image/`)
    }
    return false
  },
  logoSrcSet () {
    return `${logos.x1} 1x, ${logos.x2} 2x, ${logos.x3} 3x`
  }
}

export default methods
