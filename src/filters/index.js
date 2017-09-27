/*
 * Vue filters https://vuejs.org/v2/guide/filters.html
 */
const filters = {
  truncate: (string, value) => {
    return string.substring(0, value) + '...'
  }
}

export default filters
