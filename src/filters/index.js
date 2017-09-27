import moment from 'moment'

/*
 * Vue filters https://vuejs.org/v2/guide/filters.html
 */
const filters = {
  truncate: (string, value) => {
    return string.substring(0, value) + '…'
  },
  formatDate: (date) => {
    if (date instanceof Date) {
      return moment(date).format('MM/DD/YYYY hh:mm')
    } else if (typeof date === 'string') {
      return moment(new Date(date)).format('MM/DD/YYYY hh:mm')
    }
    return date
  }
}

export default filters
