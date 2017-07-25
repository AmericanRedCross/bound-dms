<template>
  <div class="user-new">
    <div class="row">
      <div class="col-lg-8">
        <EditForm v-if="user" v-bind:user="user" v-bind:newUser="true"></EditForm>
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
      user: new User({})
    }
  }
}
</script>
