<template>
  <b-card bg-variant="light" class="card">
    <h4>Help me... What is it?</h4>
    <b-form-group
      v-for="(label, index) in notFoundListArray"
      :key="label"
      :label="label"
      label-cols-sm="4"
      label-cols-lg="3"
      :label-for="`input-nfl-${index}`">
      <b-form-select
        :id="`input-nfl-${index}`"
        :options="categories"
        @input="updateData(label, arguments[0])"
      />
    </b-form-group>
  </b-card>
</template>

<script>
import categories from '../../categories';

export default {
  name: 'NotFoundList',
  props: {
    list: {
      type: Set,
      require: true,
    },
  },
  data() {
    return {
      categories,
    };
  },
  computed: {
    notFoundListArray() {
      return [...this.list];
    },
  },
  methods: {
    updateData(label, value) {
      this.$emit('updateCategories', { label, value });
    },
  },
};
</script>

<style lang="scss" scoped>
  .card {
    margin: 3rem 0;
  }
</style>
