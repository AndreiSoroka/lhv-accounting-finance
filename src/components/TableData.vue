<template>
  <div>
    <b-table
      striped
      hover
      :items="items"
      :fields="fields"/>
  </div>
</template>

<script>
export default {
  name: 'TableData',
  props: {
    data: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      fields: [
        {
          key: 'key',
          label: 'Category',
          sortable: false,
        },
        {
          key: 'price',
          label: 'Price',
          sortable: true,
        },
      ],
    };
  },
  computed: {
    items() {
      const items = [];
      // eslint-disable-next-line guard-for-in
      for (const key in this.data) {
        const price = -this.data[key];
        items.push({
          key,
          price,
        });
      }
      return items;
    },
  },
};
</script>

<style scoped lang="scss">
</style>
