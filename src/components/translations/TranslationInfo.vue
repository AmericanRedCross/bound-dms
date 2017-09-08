<template>
  <div class="translation-info">
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
      <b-progress v-model="translated" :precision="1"></b-progress>
      <small>
      {{ translated }}% of content translated
      </small>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      translated: 23
    }
  }
}
</script>
