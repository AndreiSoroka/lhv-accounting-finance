<template>
  <b-container>
    <b-row>
      <b-col>
        <load-files @input="getCsvData"/>
      </b-col>
    </b-row>
    <b-row v-if="notFoundList.size">
      <b-col>
        <not-found-list :list="notFoundList" @updateCategories="updateCategories"/>
      </b-col>
    </b-row>
    <b-row
      v-for="date in sortedDates"
      :key="date">
      <b-col class="item">
        <h4>{{ date | moment('MMMM YYYY') }}</h4>
        <chart-data :data="costCalculatedData[date]"/>
        <table-data :data="costCalculatedData[date]"/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Vue from 'vue';
import LoadFiles from './components/LoadFiles.vue';
import ChartData from './components/ChartData.vue';
import TableData from './components/TableData.vue';
import NotFoundList from './components/NotFoundList.vue';
import costCalculation from './costCalculation';

export default {
  name: 'App',
  components: {
    NotFoundList,
    LoadFiles,
    ChartData,
    TableData,
  },
  data() {
    return {
      categories: {},
      transactionsList: [],
      notFoundList: new Set(),
    };
  },
  computed: {
    costCalculation() {
      return costCalculation(this.transactionsList, this.categories);
    },
    sortedDates() {
      return Object.keys(this.costCalculatedData).sort((a, b) => (a < b ? 1 : -1));
    },
    costCalculatedData() {
      return this.costCalculation.costCalculatedData;
    },
  },
  methods: {
    async updateCategories({ label, value }) {
      if (!label || !value) {
        return;
      }
      Vue.set(this.categories, label, value);

      await fetch('/api/updateData', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ label, value }),
      });
    },
    async getCsvData(data) {
      if (!data) {
        this.categories = {};
        this.costCalculatedData = {};
        this.notFoundList = new Set();
      }

      const transactionsList = [];
      const transactionsCompanies = new Set();

      // eslint-disable-next-line no-restricted-syntax
      for (const transaction of data) {
        transactionsCompanies.add(transaction[4]);
        transactionsList.push([transaction[2], transaction[4], +transaction[8]]);
      }

      const categories = await fetch('/api/getRules', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ list: [...transactionsCompanies] }),
      });

      this.categories = await categories.json();
      this.transactionsList = transactionsList;
    },
  },
  watch: {
    costCalculation({ notFoundList }) {
      this.notFoundList = new Set([...this.notFoundList, ...notFoundList]);
    },
  },
};
</script>

<style lang="scss" scoped>
  .item {
    margin: 3rem 0;
  }
</style>
