<!-- Wraps all IMPRINT components -->

<template>
  <div class="imprint container">
    <slot>
      <!-- YOUR MARKUP HERE -->
      insert imprint here
    </slot>
  </div>
</template>

<script>
  // Import glue-config.js
  import { glueConfig as GLUE_CONFIG } from '@/../config/user-config';

  export default {
    name: 'Imprint',
    components: {
    },
    metaInfo() {
      return {
        title: this.$t('message.navigation.navItems.imprint'),
        meta: [
          { name: 'description', vmid: 'description', content: `${this.$t('message.navigation.navItems.imprint')} - ${this.$t('message.header.european')} ${this.$t('message.header.dataPortal')}` },
          { name: 'keywords', vmid: 'keywords', content: `${GLUE_CONFIG.keywords} ${this.$t('message.navigation.navItems.imprint')}` },
          { property: 'robots', content: 'follow,noindex' },
        ],
      }
    },
    data() {
      return {};
    },
    methods: {},
  };
</script>

<style lang="scss" scoped>
</style>
