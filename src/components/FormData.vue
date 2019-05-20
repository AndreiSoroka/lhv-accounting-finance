<template>
  <div>
    <b-form-textarea
      v-model="csvData"
      placeholder="CSV file data from LHV export"
      rows="8"
    />
  </div>
</template>

<script>
export default {
  name: 'FormData',
  data() {
    return {
      csvData: '',
    };
  },
  watch: {
    csvData() {
      this.$emit('data', this.csvData);
    },
  },
};
</script>

<style scoped lang="scss">
</style>
