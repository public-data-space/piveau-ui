<!-- ERROR page -->

<template>
  <div class="not-found container">
    <slot>
      <div class="row mt-1 mb-3">
        <div class="col-10 offset-1">
          <p>ERROR: THIS PAGE DOES NOT EXIST!</p>
          <button
            class="btn btn-sm btn-secondary"
            @click="$router.go(-1)"
          >
            GO BACK
          </button>
        </div>
      </div>
    </slot>
  </div>
</template>

<script>
import { glueConfig as GLUE_CONFIG }from '@/../config/user-config';

  export default {
    name: 'NotFound',
    metaInfo() {
      return {
        title: this.$t('message.metadata.notFound'),
        meta: [
          { name: 'description', vmid: 'description', content: `${this.$t('message.metadata.notFound')} - ${this.$t('message.header.european')} ${this.$t('message.header.dataPortal')}` },
          { name: 'keywords', vmid: 'keywords', content: `${GLUE_CONFIG.keywords} ${this.$t('message.metadata.notFound')}` },
          { property: 'robots', content: 'follow,noindex' },
        ],
      };
    },
  };
</script>

<style lang="scss" scoped>
</style>
