import Notifications from './Notifications.vue'

const NotificationStore = {
  state: [], // here the notifications will be added

  removeNotification (index) {
    this.state.splice(index, 1)
  },
  notify (notification) {
    notification.id = Math.random().toString(36).substring(7)
    this.state.push(notification)
  }
}

var NotificationsPlugin = {

  install (Vue) {
    Object.defineProperty(Vue.prototype, '$notifications', {
      get () {
        return NotificationStore
      }
    })
    Vue.component('Notifications', Notifications)
  }
}

export default NotificationsPlugin
