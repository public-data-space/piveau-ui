// Base layout for 'detail' pages e.g. DatasetDetails, Imprint, UserPrivacy, etc.

<template>
  <div class="detail-page-wrapper">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'DetailPageLayout',
}
</script>

<style scoped lang="scss">
  @import '~@/styles/bootstrap_theme.scss';
  .detail-page-wrapper {
      padding-top: 2rem;
      padding-bottom: 2rem;
      margin-top: 1rem;
      margin-bottom: 1rem;
      background-color: $light;
      border-radius: 2rem;
  }
</style>