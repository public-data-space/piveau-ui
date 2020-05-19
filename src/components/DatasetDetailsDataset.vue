/*
The 'dataset' body part of the detaset details page.
*/

<template>
  <div class="datasets-details-dataset-wrapper">
    <dataset-details-dataset-base
      disable-translation-alert
      disable-incorrect-date-alert
      disable-options-dropdown
    />
  </div>
</template>

<script>
import DatasetDetailsDatasetBase from '@/components/piveau-ui-core/EDP2-datasetDetails-dataset';

export default {
  name: 'Datasets',
  components: {
    DatasetDetailsDatasetBase,
  }
}
</script>

<style scoped lang="scss">
  @import '~@/styles/bootstrap_theme.scss';
</style>