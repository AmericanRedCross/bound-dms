<template>
    <div class="project-detail">
      <StatsOverview v-if="currentProject" :project="currentProject" class="mb-3"></StatsOverview>
      <b-card v-if="$auth.check(['admin', 'editor'])" :title="$t('projects.dashboard.publishing')" class="mb-3">
        <div>
          <b-button variant="outline-primary" :to="{name: 'project-publish'}">
            {{ $t('projects.dashboard.viewPublish') }}
          </b-button>
        </div>
      </b-card>
      <b-card class="mb-3" :title="$t('projects.dashboard.languages')">
        <LanguageTable v-if="currentProject" :project="currentProject" class="mb-3"></LanguageTable>
      </b-card>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import StatsOverview from './StatsOverview'
import LanguageTable from './LanguageTable'

export default {
  name: 'project-detail',
  components: {
    StatsOverview,
    LanguageTable
  },
  data () {
    return {
      changes: 36
    }
  },
  computed: {
    ...mapGetters([
      'getProjectById'
    ]),
    currentProject () {
      return this.getProjectById(parseInt(this.$route.params.id))
    }
  }
}
</script>
