<template>
  <div>
    <div v-if="isSupportFileAPI" class="load-files">
      <b-form-file
        multiple
        v-model="files"
        accept=".csv"/>
    </div>
    <b-form-textarea
      v-else
      v-model="csvData"
      placeholder="CSV file data from LHV export"
      rows="8"
    />
  </div>
</template>

<script>
import parse from 'csv-parse';

export default {
  name: 'FormData',
  data() {
    return {
      isSupportFileAPI: window.File && window.FileReader && window.FileList && window.Blob,
      csvData: '',
      files: [],
    };
  },
  watch: {
    csvData() {
      // todo check
      this.$emit('data', this.parseFromCsv(this.csvData));
    },
    async files(data) {
      if (!data.length) {
        this.$emit('input', null);
      }

      let result = [];

      const files = data.map(file => this.readFileSync(file));

      // eslint-disable-next-line no-restricted-syntax
      for await (const file of files) {
        if (file.result) {
          result = [...result, ...await this.parseFromCsv(file.result)];
        }
      }

      result.map(transaction => [transaction[2], transaction[4], +transaction[8]]);

      this.$emit('input', result);
    },
  },
  methods: {
    readFileSync(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = e => resolve(e.currentTarget);
        reader.onerror = e => reject(e);
        reader.readAsBinaryString(file);
      });
    },
    parseFromCsv(data) {
      if (!data) {
        return Promise.resolve([]);
      }

      // todo wtf?
      // eslint-disable-next-line no-param-reassign
      data = data.split(/\r\n|\r|\n/).slice(1).join('\r\n');

      return new Promise((resolve) => {
        const output = [];
        parse(data, {
          trim: true,
          skip_empty_lines: true,
        })
          .on('readable', function onReadable() {
            let record;
            // eslint-disable-next-line no-cond-assign
            while (record = this.read()) {
              output.push(record);
            }
          })
          .on('end', () => {
            resolve(output);
          });
      });
    },
  },
};
</script>

<style scoped lang="scss">
  .load-files {
    margin: 3rem 0;
  }
</style>
