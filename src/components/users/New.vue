<template>
  <div class="user-new">
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6">
        <EditForm v-bind:user="user" v-bind:newUser="true"></EditForm>
      </div>
    </div>
  </div>
</template>

<script>
import EditForm from '@/components/users/edit/EditForm'
import { User } from '../../vuex/modules/user/User'

export default {
  name: '',
  components: {
    EditForm
  },
  data () {
    return {
      user: new User()
    }
  }
}
</script>
