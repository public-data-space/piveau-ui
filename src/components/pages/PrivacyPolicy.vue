<template>
  <detail-page-layout>
    <privacy-policy-base>
    <!-- insert data protection information here -->
    </privacy-policy-base>
  </detail-page-layout>
</template>

<script>
import DetailPageLayout from '@/components/layouts/DetailPageLayout'
import PrivacyPolicyBase from '@/components/piveau-ui-core/PrivacyPolicy';

export default {
  name: 'Imprint',
  components: {
    DetailPageLayout,
    PrivacyPolicyBase,
  }
}
</script>

<style scoped lang="scss">
</style>
