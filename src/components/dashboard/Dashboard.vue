<template>
  <div class="dashboard">
    <h1 id="changeText">{{ $t('dashboard.header') }}</h1>
      <div class="row justify-content-md-center">
        <div class="col-3">
          <b-card id="card1" :header="$t('dashboard.chart1')">
            <div class="small">
              <line-chart :chart-data="datacollection"></line-chart>
              <button @click="fillData()">Randomize</button>
            </div>
          </b-card>
        </div>
        <div class="col-3">
          <b-card id="card2" :header="$t('dashboard.chart2')">
            <div class="small">
              <bar-chart :chart-data="datacollection"></bar-chart>
              <button @click="fillData()">Randomize</button>
            </div>
          </b-card>
        </div>
        <div class="col-3">
          <b-card id="card3" :header="$t('dashboard.chart3')">
            <div class="small">
              <scatter-chart :chart-data="datacollection"></scatter-chart>
              <button @click="fillData()">Randomize</button>
            </div>
          </b-card>
        </div>
      </div>
  </div>
</template>

<script>
import LineChart from './LineChart.js'
import BarChart from './BarChart.js'
import ScatterChart from './ScatterChart.js'

export default {
  name: 'dashboard',
  components: {
    LineChart,
    BarChart,
    ScatterChart
  },
  data () {
    return {
      msg: 'Dashboard Placeholder',
      datacollection: null
    }
  },
  mounted () {
    this.fillData()
  },
  methods: {
    fillData () {
      this.datacollection = {
        labels: [this.getRandomInt(), this.getRandomInt()],
        datasets: [
          {
            label: 'Sample Data 1',
            backgroundColor: '#ff908c',
            data: [this.getRandomInt(), this.getRandomInt()]
          }, {
            label: 'Sample Data 2',
            backgroundColor: '#fdcb4e',
            data: [this.getRandomInt(), this.getRandomInt()]
          }
        ]
      }
    },
    getRandomInt () {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.small {
    max-width: 600px;
  }

</style>
