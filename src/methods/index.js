/*
 * Vue Methods, common throughout the app
 */
const methods = {
  isImage (file) {
    if (file.mimeType) {
      return file.mimeType.match(`image/`)
    }
    return false
  }
}

export default methods
