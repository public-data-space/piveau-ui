<template>
  <div>
    <div class="mt-3">
      <div class="row">
        <div class="col-10 offset-1">
          <h3>{{ $t('message.datasetDetails.subnav.similarDatasets') }}</h3>
          <div
            v-if="!similarDatasetsFetched"
            class="loading-spinner mx-auto"
          />
          <p v-if="!similarDatasetsPresent && similarDatasetsFetched">
            {{ $t('message.similarDatasets.notFound') }}
          </p>
          <div
            v-if="similarDatasetsPresent && similarDatasetsFetched"
            class="mt-4"
          >
            <div
              v-for="(similarDataset, i) in similarDatasets"
              v-if="has(similarDataset, 'title') && has(similarDataset, 'description')"
              :key="i"
              class="mt-3 border-bottom border-secondary"
            >
              <app-link
                class="text-dark font-weight-bold"
                :to="similarDataset.uri"
              >
                <h6>{{ getTranslationFor(similarDataset.title, $i18n.locale, getLanguages) }}</h6>
              </app-link>
              <p class="text-muted text-truncate">
                <small>{{ getTranslationFor(similarDataset.description, $i18n.locale, getLanguages) }}</small>
              </p>
              <div class="mb-3">
                <span
                  v-if="similarDataset.distance <= 20"
                  class="p-1 ml-1 badge badge-success text-center text-white"
                >Very Similar</span>
                <span
                  v-else-if="similarDataset.distance > 20 && similarDataset.distance <= 30"
                  class="p-1 ml-1 badge badge-info text-center text-white"
                >Similar</span>
                <span
                  v-else-if="similarDataset.distance > 30 && similarDataset.distance <= 40"
                  class="p-1 ml-1 badge badge-warning text-center text-white"
                >Less Similar</span>
                <span
                  v-else
                  class="p-1 ml-1 badge badge-secondary text-center text-white"
                >Marginal Similar</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import { has } from 'lodash';
  import { getTranslationFor } from '@/utils/helpers';
  import AppLink from './AppLink';

  export default {
    name: 'DatasetDetailsSimilarDatasets',
    dependencies: 'DatasetService',
    components: {
      appLink: AppLink,
    },
    metaInfo() {
      return {
        title: this.$t('message.similarDatasets.similarDatasets'),
        meta: [
          {
            name: 'description',
            vmid: 'description',
            content: (`${this.$t('message.similarDatasets.similarDatasets')} - ${this.getTranslationFor(this.getTitle, this.$i18n.locale, this.getLanguages)} - ${this.$t('message.header.european')} ${this.$t('message.header.dataPortal')}`).substr(0, 4999),
          },
          {
            name: 'keywords',
            vmid: 'keywords',
            content: this.getKeywords.map(k => k.title).join(' ').substr(0, 4999),
          },
          { property: 'robots', content: 'follow,noindex' },
        ],
      };
    },
    data() {
      return {
        similarDatasetsFetched: false,
        similarDatasetsPresent: false,
      };
    },
    computed: {
      // import store-getters
      ...mapGetters('datasetDetails', [
        'getKeywords',
        'getLanguages',
        'getSimilarDatasets',
        'getTitle',
      ]),
      similarDatasets() {
        return this.getSimilarDatasets;
      },
    },
    methods: {
      // import store-actions
      ...mapActions('datasetDetails', [
        'loadDatasetDetails',
        'loadSimilarDatasets',
        'loadSimilarDatasetDetails',
        'useService',
      ]),
      has,
      getTranslationFor,
      /**
       * Update all similar datasets by adding title and description
       */
      updateSimilarDatasets() {
        this.similarDatasets.forEach(this.getDatasetDetails);
      },
      /**
       * Get dataset details by id
       */
      getDatasetDetails(similarDataset) {
        this.loadSimilarDatasetDetails(similarDataset.id);
      },
    },
    created() {
      this.useService(this.DatasetService);
      this.$nextTick(() => {
        this.$Progress.start();
        this.loadDatasetDetails(this.$route.params.ds_id)
          .then(() => {
            this.loadSimilarDatasets(this.$route.params.ds_id)
              .then((response) => {
                this.$nextTick(() => {
                  this.updateSimilarDatasets();
                  this.similarDatasetsFetched = true;
                  this.similarDatasetsPresent = response.length > 0;
                });
                this.$Progress.finish();
              })
              .catch(() => {
                this.$Progress.fail();
              });
          })
          .catch(() => {
            this.$Progress.fail();
          });
      });
    },
  };
</script>

<style lang="scss" scoped>
  @import '~@/styles/bootstrap_theme';
  @import '~@/styles/utils/css-animations';
</style>
