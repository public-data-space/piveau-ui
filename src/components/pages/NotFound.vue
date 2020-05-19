<template>
  <detail-page-layout>
    <not-found-base />
  </detail-page-layout>
</template>

<script>
import DetailPageLayout from '@/components/layouts/DetailPageLayout'
import NotFoundBase from '@/components/piveau-ui-core/NotFound';

export default {
  name: 'Imprint',
  components: {
    DetailPageLayout,
    NotFoundBase,
  }
}
</script>

<style scoped lang="scss">
</style>