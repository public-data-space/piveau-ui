<template>
  <detail-page-layout>
    <div class="imprint container">
      <!-- Insert about information here -->
    </div>
  </detail-page-layout>
</template>

<script>
import DetailPageLayout from '@/components/layouts/DetailPageLayout'

export default {
  name: 'About',
  components: {
    DetailPageLayout,
  },
  metaInfo() {
    return {
      title: "Hilfe",
    }
  },
}
</script>

<style scoped lang="scss">
</style>
