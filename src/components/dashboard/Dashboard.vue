<template>
  <div class="dashboard">
    <h1 id="changeText">{{ $t('dashboard.header') }}</h1>
      <div class="row justify-content-md-center">
        <div class="col-lg-4">
          <b-card id="card1" :header="$t('dashboard.chart1')">
            <line-chart :chart-data="datacollection"></line-chart>
            <button @click="fillData()">{{ $t('dashboard.randomize') }}</button>
          </b-card>
        </div>
        <div class="col-lg-4">
          <b-card id="card2" :header="$t('dashboard.chart2')">
            <bar-chart :chart-data="datacollection"></bar-chart>
            <button @click="fillData()">{{ $t('dashboard.randomize') }}</button>
          </b-card>
        </div>
        <div class="col-lg-4">
          <b-card id="card3" :header="$t('dashboard.chart3')">
            <scatter-chart :chart-data="datacollection"></scatter-chart>
            <button @click="fillData()">{{ $t('dashboard.randomize') }}</button>
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
