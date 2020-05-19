<!-- HOME page -->

<template>
  <div>
    <p>{{ $t('message.home.msg') }}</p>
  </div>
</template>

<script>
  // Import glue-config.js
  import { glueConfig as GLUE_CONFIG } from '@/../config/user-config';

  export default {
    name: 'Home',
    metaInfo: {
      title: this.$t('message.navigation.navItems.home'),
      meta: [
        { name: 'description', vmid: 'description', content: `${this.$t('message.navigation.navItems.home')} - ${this.$t('message.header.european')} ${this.$t('message.header.dataPortal')}` },
        { name: 'keywords', vmid: 'keywords', content: `${GLUE_CONFIG.keywords} ${this.$t('message.navigation.navItems.home')}` },
        { property: 'robots', content: 'follow,noindex' },
      ],
    },
    data() {
      return {
        msg: 'Sorry, there is no content yet. Visit the Data tab to see something',
      };
    },
    methods: {
    },
  };
</script>

<style lang="scss" scoped>
</style>
