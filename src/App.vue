<template>
  <b-container>
    <b-row>
      <b-col>
        <form-data @data="csvData = arguments[0]"/>
      </b-col>
    </b-row>
    <b-row
      v-for="date in costCalculationDates"
      :key="date">
      <b-col>
        <h4>{{ date | moment("MMMM YYYY") }}</h4>
        <chart-data :data="costCalculation[date]"/>
        <table-data :data="costCalculation[date]"/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import FormData from './components/FormData.vue';
import ChartData from './components/ChartData.vue';
import TableData from './components/TableData.vue';
import costCalculation from './costCalculation';

export default {
  name: 'App',
  components: {
    FormData,
    ChartData,
    TableData,
  },
  data() {
    return {
      csvData: '',
    };
  },
  computed: {
    formattingData() {
      if (!this.csvData) {
        return [];
      }
      return this.csvData
        .split(/\r\n|\r|\n/)
        .map((row) => {
          const formatting = row.split(/\t/);
          // todo
          return [formatting[2], formatting[4], +formatting[8]];
        });
    },
    costCalculation() {
      if (!this.formattingData.length) {
        return {};
      }
      return costCalculation(this.formattingData);
    },
    costCalculationDates() {
      return Object.keys(this.costCalculation).sort().reverse();
    },
  },
};
</script>

<style lang="scss">
</style>
