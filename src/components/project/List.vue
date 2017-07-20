<template>
  <div>
    <h1 id="changeText" class="text-center">{{ $t('projects.header') }}</h1>
      <div class="row">
        <div class="col-md-4" v-for="project in projects.projects">
          <ProjectCard :project="project"></ProjectCard>
        </div>
        <div class="col-md-4">
          <b-card class="new-project mb-4">
            <b-button :block="true" href="">Create New Project</b-button>
          </b-card>
        </div>
      </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import ProjectCard from './ProjectCard'
export default {
  data () {
    return {
      headers: {
        picture: {
          label: ''
        },
        id: {
          label: 'ID',
          sortable: true
        },
        name: {
          label: 'Name',
          sortable: true
        },
        languages: {
          label: 'Languages'
        },
        actions: {
          label: 'Actions'
        }
      },
      perPage: 10,
      currentPage: 1,
      filter: null
    }
  },
  components: {
    ProjectCard
  },
  mounted () {
    // this.$store.dispatch('GET_PROJECTS')
  },
  methods: {
    deleteClick (e) {
      // Call the swal confirm dialog
      this.$swal({
        title: this._i18n.t('common.areYouSure'),
        text: this._i18n.t('common.noRevert'),
        type: 'warning',
        showCancelButton: true,
        showLoaderOnConfirm: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: this._i18n.t('common.deleteIt'),
        // Pre confirm it. Used for async requests. Close the dialoag when this is finished
        preConfirm: () => {
          return new Promise((resolve, reject) => {
            console.log(e.target)
            let project = this.getProjectById(parseInt(e.target.dataset.id, 10))
            if (project) {
              // If the project exists then call the delete
              this.$store.dispatch('DELETE_USER', parseInt(e.target.dataset.id, 10)).then(resolve)
            } else {
              reject(this._i18n.t('projects.couldNotFind'))
            }
          })
        },
        allowOutsideClick: false
      }).then(() => {
        this.$swal({
          type: 'success',
          title: this._i18n.t('common.deleted')
        })
      })
    }
  },
  computed: {
    ...mapGetters([
      'getProjectById'
    ]),
    ...mapState([
      'projects'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .project-icon {
    border-radius: 50%;
    height: 40px;
  }
</style>
