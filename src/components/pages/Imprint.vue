<template>
  <detail-page-layout>
    <imprint-base>
    <!-- insert imprint information here -->
    </imprint-base>
  </detail-page-layout>
</template>

<script>
import DetailPageLayout from '@/components/layouts/DetailPageLayout'
import ImprintBase from '@/components/piveau-ui-core/Imprint';

export default {
  name: 'Imprint',
  components: {
    DetailPageLayout,
    ImprintBase,
  }
}
</script>

<style scoped lang="scss">
</style>
