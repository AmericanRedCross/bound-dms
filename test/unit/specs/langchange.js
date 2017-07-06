import Vue from 'vue'
import App from '@/App'

describe('App.vue', () => {
  it('sets the correct default language', () => {
    const vm = new Vue(App).$mount()
    expect(vm._i18n.locale).toBe('en')
  })
})
