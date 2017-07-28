<template>
    <div class="translation-workflow" align="center">
      <div class="visible-toggle" align="center">
        <b-button>All Content</b-button>
        <b-button>Needs Translation</b-button>
        <b-button>Needs Revision</b-button>
      </div>
      <br />
      <div class="translation-info" align="center">
        <span>Base Language</span>
        <span class="ml-auto">
          <b-dropdown class="m-md-2" right text="EN">
            <b-dropdown-item-button>
              EN
            </b-dropdown-item-button>
          </b-dropdown>
        </span>
        <span>
          <fa-icon name="play"></fa-icon>
        </span>
        <span class="ml-auto">
          <b-dropdown class="m-md-2" right text="ESP">
            <b-dropdown-item-button>
              ESP
            </b-dropdown-item-button>
          </b-dropdown>
        </span>
        <span>Translation Language</span>
      </div>
      <div class="translation-progress col-md-3" align="center">
        <b-progress v-model="translated" :precision="1" animated></b-progress>
        <small>
        {{ translated }}% of content translated
        </small>
      </div>
      <div>
        <ModuleCard></ModuleCard>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ModuleCard from '@/components/translations/ModuleCard'

export default {
  name: 'translation-workflow',
  components: {
    ModuleCard
  },
  data () {
    return {
      project: null,
      translated: 23
    }
  },
  computed: {
    ...mapGetters([
      'getProjectById'
    ])
  }
}
</script>
