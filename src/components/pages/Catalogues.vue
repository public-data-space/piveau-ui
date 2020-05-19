/*
The datasets component.
*/

<template>
  <div class="catalogues-wrapper">
    <base-catalogues>
      <template #search-result-filters>
        <!-- This slot is empty on purpose -->
        <div />
      </template>
      <template #search-result-count-alert>
        <datasets-results-info
          :loading-message="$t('message.catalogues.loadingMessage')"
          :count-message="$t('message.catalogues.countMessage')"
          :count-message-singular="$t('message.catalogues.countMessageSingular')"
          :count-message-no-result="$t('message.catalogues.countMessageNoResult')"
          :result-count="getCataloguesCount"
          :is-loading="getLoading"
          :sort-query="getSort"
        />
      </template>
    </base-catalogues>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BaseCatalogues from '@/components/piveau-ui-core/Catalogues';
import DatasetsResultsInfo from '@/components/DatasetsResultsInfo';

export default {
  name: 'Catalogues',
  components: {
    BaseCatalogues,
    DatasetsResultsInfo,
  },
  data() {
    return {
      sortSelected: 'relevance+desc, modification_date+desc, title.en+asc',
      sortSelectedLabel: this.$t('message.sort.lastUpdated'),
    }
  },
  computed: {
      ...mapGetters('catalogues', [
        'getCataloguesCount',
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

  .catalogues-wrapper {
    /deep/ .data-info-box {
      &:hover {
        box-shadow: 8px 28px 50px rgba(39,44,49,.06), 1px 6px 12px rgba(39,44,49,.04);
      }
    }
  }
</style>
