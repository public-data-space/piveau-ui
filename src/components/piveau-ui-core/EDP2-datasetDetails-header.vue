<template>
  <!-- HEADER -->
  <div>
    <div class="row">
      <div class="col-10 offset-1">
        <!-- TITLE -->
        <h1 class="dataset-details-title">
          {{ getTranslationFor(getTitle, $i18n.locale, getLanguages) }}
        </h1>
      </div>
    </div>
    <div class="row mt-1">
      <div class="col-6 offset-1">
        <img
          v-if="showCountryFlag(getCountry)"
          class="mr-1 border border-dark"
          width="30"
          alt="Catalog Flag"
          :src="getCountryFlagImg(getCountry.id)"
        >
        <span>{{ getTranslationFor(getCatalog.title, $i18n.locale, getLanguages) }}</span>
      </div>
      <div class="col-4 px-1 text-right text-break">
        <span class="font-weight-bold">{{ $t('message.metadata.updated') }}:</span>
        <dataset-date :date="getModificationDate" />
      </div>
    </div>
    <hr>
  </div>
</template>

<script>
  // import Actions and Getters from Store Module
  import { mapGetters } from 'vuex';
  // import helper functions
  import { has, isNil } from 'lodash';

  import DatasetDate from './DatasetDate';

  // import filters
  import dateFilters from '@/filters/dateFilters';
  import { getTranslationFor, getCountryFlagImg } from '@/utils/helpers';

  export default {
    name: 'DatasetDetailsDataset',
    components: {
      DatasetDate,
    },
    dependencies: 'DatasetService',
    data() {
      return {};
    },
    computed: {
      // import store-getters
      ...mapGetters('datasetDetails', [
        'getCatalog',
        'getCountry',
        'getLanguages',
        'getModificationDate',
        'getTitle',
      ]),
    },
    methods: {
      has,
      isNil,
      getTranslationFor,
      getCountryFlagImg,
      filterDateFormatUS(date) {
        return dateFilters.formatUS(date);
      },
      filterDateFormatEU(date) {
        return dateFilters.formatEU(date);
      },
      filterDateFromNow(date) {
        return dateFilters.fromNow(date);
      },
      showCountryFlag(country) {
        return has(country, 'id') && !isNil(country.id);
      },
    },
  };
</script>

<style scoped lang="scss">
@import "~bootstrap/scss/bootstrap";

.dataset-details-title {
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
  font-family: inherit;
  font-weight: 500;
  line-height: 1.2;
  color: inherit;
}

@include media-breakpoint-up(md) {
  .dataset-details-title {
    font-size: 1.5rem;
  }
}

@include media-breakpoint-up(lg) {
  .dataset-details-title {
    font-size: 1.75rem;
  }
}
</style>
