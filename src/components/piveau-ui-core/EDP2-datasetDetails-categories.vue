<template>
  <div>
    <div class="mt-3">
      <div class="row">
        <div class="col-10 offset-1">
          <h3>{{ $t('message.datasetDetails.subnav.categories') }}</h3>
          <div class="categories mt-4">
            <div
              v-for="category in getCategories"
              :key="category.id"
              class="p-2 mt-3 border border-secondary bg-light"
            >
              <app-link
                v-if="showCategory(category)"
                :to="getCategoryLink(category)"
              >
                {{ category.title }}
              </app-link>
            </div>
            <div v-if="getCategories && getCategories.length === 0">
              <p>{{ $t('message.datasetCategories.noCategories') }}</p>
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
    name: 'DatasetDetailsCategories',
    dependencies: 'DatasetService',
    components: {
      appLink: AppLink,
    },
    metaInfo() {
      return {
        title: this.$t('message.metadata.categories'),
        meta: [
          {
            name: 'description',
            vmid: 'description',
            content: (`${this.$t('message.metadata.categories')} - ${this.getTranslationFor(this.getTitle, this.$i18n.locale, this.getLanguages)} - ${this.$t('message.header.european')} ${this.$t('message.header.dataPortal')}`).substr(0, 4999),
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
      return {};
    },
    computed: {
      // import store-getters
      ...mapGetters('datasetDetails', [
        'getCategories',
        'getKeywords',
        'getLanguages',
        'getTitle',
      ]),
    },
    methods: {
      has,
      getTranslationFor,
      // import store-actions
      ...mapActions('datasetDetails', [
        'loadDatasetDetails',
        'useService',
      ]),
      showCategory(category) {
        return has(category, 'id');
      },
      getCategoryLink(category) {
        const categoryID = category.id.toLowerCase();
        return { path: `/datasets?categories=${categoryID}`, query: Object.assign({}, { locale: this.$route.query.locale }) };
      },
    },
    created() {
      this.useService(this.DatasetService);
      this.$nextTick(() => {
        this.$Progress.start();
        this.loadDatasetDetails(this.$route.params.ds_id)
          .then(() => {
            this.$Progress.finish();
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
</style>
