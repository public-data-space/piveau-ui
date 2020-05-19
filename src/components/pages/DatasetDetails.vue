/*
The datasets details page.
*/

<template>
  <detail-page-layout>
    <dataset-details-base
      :with-feedback="false"
      :with-similar-datasets="false"
    />
  </detail-page-layout>
</template>

<script>
import DetailPageLayout from '@/components/layouts/DetailPageLayout'
import DatasetDetailsBase from '@/components/piveau-ui-core/EDP2-datasetDetails';

export default {
  name: 'Datasets',
  components: {
    DetailPageLayout,
    DatasetDetailsBase,
  }
}
</script>

<style scoped lang="scss">
</style>