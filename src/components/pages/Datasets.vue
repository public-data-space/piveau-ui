/*
The datasets component.
*/

<template>
  <div class="datasets-wrapper">
    <base-datasets>
      <template #search-result-filters>
        <!-- This slot is empty on purpose -->
        <div />
      </template>
      <template #search-result-count-alert>
        <datasets-results-info
          :loading-message="$t('message.datasets.loadingMessage')"
          :count-message="$t('message.datasets.countMessage')"
          :count-message-singular="$t('message.datasets.countMessageSingular')"
          :count-message-no-result="$t('message.datasets.noResult')"
          :result-count="getDatasetsCount"
          :is-loading="getLoading"
          :sort-query="getSort"
        />
      </template>
    </base-datasets>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BaseDatasets from '@/components/piveau-ui-core/Datasets';
import DatasetsResultsInfo from '@/components/DatasetsResultsInfo';

export default {
  name: 'Datasets',
  components: {
    BaseDatasets,
    DatasetsResultsInfo,
  },
  data() {
    return {
      sortSelected: 'relevance+desc, modification_date+desc, title.en+asc',
      sortSelectedLabel: this.$t('message.sort.lastUpdated'),
    }
  },
  computed: {
      ...mapGetters('datasets', [
        'getDatasetsCount',
        'getLoading',
        'getSort'
    ]),
  },
  methods: {
    setSortMethod(method, order, label) {
        this.sortSelectedLabel = label;
        this.sortSelected = `${method}+${order}`;
        this.$router.replace({ query: Object.assign({}, this.$route.query, { sort: `${method}+${order}` }) });
      },
  }
}
</script>

<style scoped lang="scss">
  @import '~@/styles/bootstrap_theme.scss';

  .datasets-wrapper {
    /deep/ .datasets {
      .data-info-box {
        &:hover {
          box-shadow: 8px 28px 50px rgba(39,44,49,.06), 1px 6px 12px rgba(39,44,49,.04);
        }
      }
    }
  }
</style>
