const roles = {
  state: {
    roles: [
      {
        key: 'admin',
        title: 'Adminstator'
      },
      {
        key: 'editor',
        title: 'Content Editor'
      },
      {
        key: 'translator',
        title: 'Content Translator'
      }
    ]
  },
  getters: {
    allRoles: (state, getters) => {
      return state.roles
    }
  }
}

export default roles
