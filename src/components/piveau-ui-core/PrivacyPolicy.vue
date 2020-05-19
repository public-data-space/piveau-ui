<!-- Wraps all PRIVACY POLICY components -->

<template>
  <div class="privacy-policy container">
    <slot>
      <!-- YOUR MARKUP HERE -->
      insert Privacy policy here
    </slot>
  </div>
</template>

<script>
  import { glueConfig as GLUE_CONFIG }from '@/../config/user-config';

  export default {
    name: 'Imprint',
    metaInfo() {
      return {
        title: this.$t('message.navigation.navItems.privacyPolicy'),
        meta: [
          { name: 'description', vmid: 'description', content: `${this.$t('message.navigation.navItems.privacyPolicy')} - ${this.$t('message.header.european')} ${this.$t('message.header.dataPortal')}` },
          { name: 'keywords', vmid: 'keywords', content: `${GLUE_CONFIG.keywords} ${this.$t('message.navigation.navItems.privacyPolicy')}` },
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
