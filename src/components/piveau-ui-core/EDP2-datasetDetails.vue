<template>
  <div class="mb-5">
    <datasetDetailsTop />
    <router-view name="datasetDetailsSubpages" />
  </div>
</template>

<script>
// import Actions and Getters from Store Module
import { mapActions, mapGetters } from 'vuex';

// import nested components
import DatasetDetailsTop from './EDP2-datasetDetails-top';
import DatasetDetailsDataset from './EDP2-datasetDetails-dataset';
import DatasetDetailsCategories from './EDP2-datasetDetails-categories';
import DatasetDetailsSimilarDatasets from './EDP2-datasetDetails-similarDatasets';
// Import glue-config.js
import { glueConfig as GLUE_CONFIG } from '@/../config/user-config';
import { getTranslationFor } from '@/utils/helpers';
// import DatasetDetailsActivityStream from './EDP2-datasetDetails-activityStream';

export default {
  name: 'DatasetDetails',
  components: {
    datasetDetailsTop: DatasetDetailsTop,
    datasetDetailsDataset: DatasetDetailsDataset,
    datasetDetailsCategories: DatasetDetailsCategories,
    datasetDetailsSimilarDatasets: DatasetDetailsSimilarDatasets,
    // datasetDetailsActivityStream: DatasetDetailsActivityStream,
  },
  metaInfo() {
    const datasetTitleTranslated = this.getTranslationFor(this.getTitle, this.$i18n.locale, this.getLanguages);
    const title = datasetTitleTranslated ? `${datasetTitleTranslated} - ${GLUE_CONFIG.title}` : undefined;
    return {
      titleTemplate(chunk) {
        return chunk ? `${chunk} - ${title}` : title;
      },
    };
  },
  props: {
    activeTab: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {};
  },
  computed: {
    ...mapGetters('datasetDetails', [
      'getActiveNavigationTab',
      'getID',
      'getLanguages',
      'getTitle',
      'getDescription',
    ]),
  },
  methods: {
    ...mapActions('datasetDetails', [
      'setActiveNavigationTab',
    ]),
    getTranslationFor,
  },
  created() {},
  mounted() {},
};
</script>

<style lang="scss" scoped>
  @import '~@/styles/bootstrap_theme';
</style>
