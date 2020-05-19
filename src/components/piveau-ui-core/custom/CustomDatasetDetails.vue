<template>
  <dataset-details>
    <template
      slot="metadata-slot"
      :slot-scope="/* eslint-disable vue/no-unused-vars */'dsd'"
    >
      <!-- Add a template inside this element to customize ~/src/components/DatasetDetails.vue content -->
      <!-- See https://vuejs.org/v2/guide/components.html#Content-Distribution-with-Slots to learn how to use slots -->
    </template>
  </dataset-details>
</template>

<script>
  import DatasetDetails from '../DatasetDetails';

  export default {
    // Don't change the values for 'name' or 'components'
    name: 'CustomDatasetDetails',
    components: {
      datasetDetails: DatasetDetails,
    },
    filters: {},
    data() {
      return {};
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {},
  };
</script>

<style lang="scss" scoped>

</style>
