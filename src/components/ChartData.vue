<template>
  <div>
    <div>
      <b-form-group label="Using sub-components:">
        <b-form-checkbox-group v-model="filter">
          <b-form-checkbox
            v-for="data in filterData"
            :key="data"
            :value="data">
            {{ data }}
          </b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>
    </div>
    <apexchart
      width="700"
      height="400"
      type="donut"
      :options="options"
      :series="options.series"
    />
  </div>
</template>

<script>
import Apexchart from 'vue-apexcharts';

export default {
  name: 'ChartData',
  components: {
    Apexchart,
  },
  data() {
    return {
      filter: [],
    };
  },
  props: {
    data: {
      type: Object,
      require: true,
    },
  },
  computed: {
    options() {
      const labels = [];
      const series = [];
      // eslint-disable-next-line no-restricted-syntax,guard-for-in
      for (const key in this.data) {
        if (!this.filter.includes(key)) {
          // eslint-disable-next-line no-continue
          continue;
        }
        const price = -this.data[key];
        labels.push(`${key} (${price.toFixed(2)})`);
        series.push(price);
      }
      return { labels, series };
    },
    filterData() {
      return Object.keys(this.data);
    },
  },
  created() {
    this.filter = this.filterData;
  },
};
</script>

<style scoped lang="scss">
</style>
