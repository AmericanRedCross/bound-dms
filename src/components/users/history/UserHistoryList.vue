<template>
  <b-card class="user-history-card" header="Activity">
    {{ $t('common.filter') }} <input v-model="filter"/>
    <b-table striped hover
             :items="history"
             :fields="headers()"
             :per-page="perPage"
             :show-empty="false"
             id="history-table"
             class="table-responsive"
    >
      <template slot="action" scope="item">
             {{ $t('history.actions.'+item.item._action, {entity: $t('history.entities.'+item.item._entity)}) }}
      </template>
      <template slot="date" scope="item">
        {{ item.item._date | formatDate }}
      </template>
      <template slot="buttons" scope="item">
        <b-button v-if="item.item._changes" @click="selectHistory(item.item)"> {{ $t('common.view') }}</b-button>
      </template>
    </b-table>
    <b-pagination align="center" size="md" :total-rows="totalHistory" v-model="currentPage" :per-page="perPage" :limit="10"></b-pagination>

    <b-modal
      :lazy="true"
      id="user-history-modal"
      class="ignore-drag"
      v-model="showHistoryDetails"
      :title="$t('history.changes')"
      size="lg"
    >
      <div v-if="selectedHistory">
        <ul v-for="(value,key) in selectedHistory._changes">
          <li><b>{{ key }}:</b> {{ value }} </li>
        </ul>
      </div>
    </b-modal>

  </b-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: '',
  props: ['userId'],
  data () {
    return {
      showHistoryDetails: false,
      selectedHistory: null,
      history: [],
      filter: null,
      perPage: 10,
      currentPage: 1,
      totalHistory: 0,
      headers () {
        return {
          date: {
            label: this._i18n.t('history.fields.date'),
            sortable: false
          },
          action: {
            label: this._i18n.t('history.fields.actions'),
            sortable: false
          },
          buttons: {
            label: '',
            sortable: false
          }
        }
      }
    }
  },
  methods: {
    fetchHistory () {
      this.$store.dispatch('GET_USER_HISTORY', {
        page: this.currentPage,
        limit: this.perPage,
        filter: this.filter,
        userId: this.userId
      }).then(() => {
        let data = this.getHistory()
        this.history = data.history
        this.totalHistory = data.total
      })
      .catch(() => {
        this.$notifications.notify(
          {
            message: `<b>${this._i18n.t('common.oops')}</b><br /> ${this._i18n.t('common.error')}`,
            icon: 'exclamation-triangle',
            horizontalAlign: 'right',
            verticalAlign: 'bottom',
            type: 'danger'
          })
      })
    },
    selectHistory (history) {
      this.showHistoryDetails = true
      this.selectedHistory = history
    }
  },
  watch: {
    currentPage: {
      handler: function (val, oldVal) {
        if (val !== oldVal) {
          this.fetchHistory()
        }
      },
      deep: true
    },
    filter: function () {
      clearTimeout(this.typing)
      this.typing = setTimeout(() => {
        this.fetchHistory()
      }, 800)
    }
  },
  mounted () {
    this.fetchHistory()
  },
  computed: {
    ...mapGetters([
      'getHistory'
    ])
  }
}
</script>
