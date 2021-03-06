<template>
  <div class="container-fluid datasets">
    <div class="row">
      <div class="col d-flex d-md-none justify-content-between flex-wrap">
        <b-dropdown
          class="dropdown mb-md-0 mb-3"
          aria-labelledby="dropdown-sort-by-mobile"
          variant="primary"
        >
          <template v-slot:button-content>
            {{ $t('message.sort.sortBy') + `: ${sortSelectedLabel}` }}
          </template>
          <b-dropdown-item
            @click="setSortMethod('relevance', 'desc', $t('message.sort.relevance'))"
          >
            {{
              $t('message.sort.relevance') }}
          </b-dropdown-item>
          <b-dropdown-item
            @click="setSortMethod(`title.${$i18n.locale}`, 'asc', $t('message.sort.nameAZ'))"
          >
            {{ $t('message.sort.nameAZ') }}
          </b-dropdown-item>
          <b-dropdown-item
            @click="setSortMethod(`title.${$i18n.locale}`, 'desc', $t('message.sort.nameZA'))"
          >
            {{ $t('message.sort.nameZA') }}
          </b-dropdown-item>
          <b-dropdown-item
            @click="setSortMethod('modification_date', 'desc', $t('message.sort.lastUpdated'))"
          >
            {{ $t('message.sort.lastUpdated') }}
          </b-dropdown-item>
          <b-dropdown-item
            @click="setSortMethod('release_date', 'desc', $t('message.sort.lastCreated'))"
          >
            {{ $t('message.sort.lastCreated') }}
          </b-dropdown-item>
        </b-dropdown>
        <button
          v-b-toggle.dataset-facets-collapse
          class="btn btn-primary mb-3 text-right text-white"
          @click="filterCollapsed = !filterCollapsed"
        >
          Filter
          <i
            v-if="filterCollapsed"
            class="material-icons small-icon align-bottom"
          >arrow_drop_up</i>
          <i
            v-else
            class="material-icons small-icon align-bottom"
          >arrow_drop_down</i>
        </button>
      </div>
      <b-collapse
        id="dataset-facets-collapse"
        visible
        class="display-dataset-facets col-md-3 col-12 mb-3 mb-md-0 px-0"
      >
        <dataset-facets
          id="dataset-facets"
          class="px-0"
        />
      </b-collapse>
      <section class="col-md-9 col-12">
        <slot name="search-result-header">
          <div class="filters-group">
            <slot name="search-result-filters">
              <div class="row mb-3">
                <div class="col d-flex justify-content-between flex-wrap">
                  <b-dropdown
                    id="dropdown-1"
                    variant="primary"
                    class="dropdown d-none d-md-block mb-md-0 mb-3"
                  >
                    <template v-slot:button-content>
                      {{ $t('message.sort.sortBy') + `: ${sortSelectedLabel}` }}
                    </template>
                    <b-dropdown-item
                      @click="setSortMethod('relevance', 'desc', $t('message.sort.relevance'))"
                    >
                      {{
                        $t('message.sort.relevance') }}
                    </b-dropdown-item>
                    <b-dropdown-item
                      @click="setSortMethod(`title.${$i18n.locale}`, 'asc', $t('message.sort.nameAZ'))"
                    >
                      {{ $t('message.sort.nameAZ') }}
                    </b-dropdown-item>
                    <b-dropdown-item
                      @click="setSortMethod(`title.${$i18n.locale}`, 'desc', $t('message.sort.nameZA'))"
                    >
                      {{ $t('message.sort.nameZA') }}
                    </b-dropdown-item>
                    <b-dropdown-item
                      @click="setSortMethod('modification_date', 'desc', $t('message.sort.lastUpdated'))"
                    >
                      {{ $t('message.sort.lastUpdated') }}
                    </b-dropdown-item>
                    <b-dropdown-item
                      @click="setSortMethod('release_date', 'desc', $t('message.sort.lastCreated'))"
                    >
                      {{ $t('message.sort.lastCreated') }}
                    </b-dropdown-item>
                  </b-dropdown>
                  <!-- create a dataset button -->
                  <!-- pass the catalog if called from catalog page -->
                  <div
                    v-if="authenticated"
                    class="dropdown d-inline-block"
                  >
                    <router-link
                      v-if="catalogAllowed"
                      :to="{name: 'upload', params: { catalog: ($route.query.showcataloguedetails ? $route.query.catalog : '') } }"
                    >
                      <button
                        id="create"
                        class="btn btn-primary"
                        type="button"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        {{ $t('message.datasets.createDataset') }}
                      </button>
                    </router-link>
                  </div>
                  <div class="dropdown d-none d-md-inline-block">
                    <button
                      id="dropdown-feeds"
                      class="d-none btn btn-primary dropdown-toggle"
                      type="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i class="material-icons align-bottom">rss_feed</i>
                      {{ $t('message.datasets.datasetsFeed') }}
                    </button>
                    <div
                      class="dropdown-menu"
                      aria-labelledby="dropdown-feeds"
                    >
                      <app-link
                        class="dropdown-item text-dark text-decoration-none"
                        :path="getFeedLink('rss')"
                        :query="$route.query"
                        target="_blank"
                        matomo-track-page-view
                      >
                        RSS Feed
                      </app-link>
                      <app-link
                        class="dropdown-item text-dark text-decoration-none"
                        :path="getFeedLink('atom')"
                        :query="$route.query"
                        target="_blank"
                        matomo-track-page-view
                      >
                        ATOM Feed
                      </app-link>
                    </div>
                  </div>
                </div>
              </div>
            </slot>
            <div class="row">
              <div class="col">
                <div class="input-group">
                  <input
                    v-model="query"
                    type="text"
                    class="form-control"
                    :aria-label="$t('message.datasets.searchBar.placeholder')"
                    :placeholder="$t('message.datasets.searchBar.placeholder')"
                    @keyup.enter="changeQuery(query)"
                    @click="autocompleteData.show = autocompleteData.suggestions.length > 0 && query.length != 0 ? !autocompleteData.show : false"
                  >
                  <div class="input-group-append">
                    <button
                      class="btn btn-sm btn-primary"
                      type="button"
                      @click="changeQuery(query)"
                    >
                      <b-icon-search
                        font-scale="1.5"
                        class="material-icons"
                      >
                        search
                      </b-icon-search>
                    </button>
                  </div>
                  <div
                    v-if="autocompleteData.show"
                    class="suggestion-list-group"
                  >
                    <ul class="list-group suggestion-list">
                      <button
                        v-for="suggestion in autocompleteData.suggestions"
                        :key="suggestion.id"
                        class="list-group-item list-group-item-action"
                        @click="handleSuggestionSelection(suggestion)"
                      >
                        {{ getTranslationFor(suggestion.title, $i18n.locale, suggestion.languages) }}
                      </button>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <slot name="search-result-count-alert">
            <div
              class="alert alert-primary mt-3 d-flex flex-row"
              :class="{ 'alert-danger': getDatasetsCount <= 0 && !getLoading}"
            >
              <div>
                {{ getLoading ? $t('message.datasets.loadingMessage'):`${getDatasetsCount}
            ${$t('message.datasets.countMessage')}` }}
              </div>
              <div
                v-if="getLoading"
                class="loading-spinner ml-3"
              />
            </div>
          </slot>
        </slot>
        <!--
        <div class="alert alert-info mt-3" v-if="getGeoBoundsById('modal-map')">
          {{`${$t('message.datasets.geoBoundsMessagePre')}`}}<strong>{{getGeoBoundsById('modal-map')}}</strong>{{`. ${$t('message.datasets.geoBoundsMessageRemove')}`}}
          <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="resetGeoBounds('modal-map'); loadDatasets({})">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        -->
        <selectedFacetsOverview
          v-if="getFacets"
          :selected-facets="getFacets"
        />
        <data-info-box
          v-for="dataset in getDatasets"
          v-if="!getLoading"
          :key="dataset.id"
          class="dataset"
          :link-to="`datasets/${dataset.id}`"
          :title="getTranslationFor(dataset.title, $i18n.locale, dataset.languages) || dataset.id"
          :description="getTranslationFor(dataset.description, $i18n.locale, dataset.languages)"
          :description-length="300"
          :body-tags="removeDuplicatesOf(dataset.distributionFormats)"
          :source="{
            sourceImage: getCountryFlagImg(has(dataset, 'country.id') ? dataset.country.id : 'ids'),
            sourceTitle: dataset.catalog.title,
          }"
          :metadata="{
            releaseDate: {
              title: $t('message.metadata.created'),
              value: dataset.releaseDate,
            },
            modificationDate: {
              title: $t('message.metadata.updated'),
              value: dataset.modificationDate,
            },
          }"
        />
        <div
          v-if="getLoading"
          class="loading-spinner mx-auto mt-3 mb-3"
        />
      </section>
    </div>
    <div class="row">
      <div class="column col-12 col-md-8 offset-md-4">
        <div class="d-flex flex-row justify-content-center">
          <!--<button class="button is-primary scroll-top" @click="scrollTo(0)">Scroll top</button>-->
          <pagination
            v-if="pagination"
            class="mt-3"
            :items-count="getDatasetsCount"
            :items-per-page="getLimit"
            :click-handler="changePageTo"
            :get-page="this.getPage"
            :next-button-text="$t('message.pagination.nextPage')"
            :prev-button-text="$t('message.pagination.previousPage')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable no-undef */
  // Import vuex helpers
  import { mapActions, mapGetters } from 'vuex';
  // Import custom helpers
  import { debounce, has, uniqBy } from 'lodash';
  // eslint-disable-next-line no-unused-vars
  import fileTypes from '@/utils/fileTypes';
  // Import components used in template
  import DatasetFacets from './DatasetFacets';
  import DataInfoBox from './DataInfoBox';
  import Pagination from './Pagination';
  import AppLink from './AppLink';

  import SelectedFacetsOverview from './SelectedFacetsOverview';
  import { getTranslationFor, getCountryFlagImg } from '@/utils/helpers';
  import { decode } from '@/utils/jwt';
  import { glueConfig as GLUE_CONFIG }from '@/../config/user-config';

  export default {
    name: 'Datasets',
    dependencies: ['DatasetService'],
    components: {
      appLink: AppLink,
      selectedFacetsOverview: SelectedFacetsOverview,
      dataInfoBox: DataInfoBox,
      datasetFacets: DatasetFacets,
      pagination: Pagination,
    },
    props: {
      infiniteScrolling: {
        type: Boolean,
        default: false,
      },
      pagination: {
        type: Boolean,
        default: true,
      },
    },
    metaInfo() {
      return {
        title: this.currentSearchQuery ? `${this.currentSearchQuery}` : `${this.$t('message.header.navigation.data.datasets')}`,
        meta: [
          { name: 'description', vmid: 'description', content: `${this.$t('message.header.navigation.data.datasets')}} - ${this.$t('message.header.european')} ${this.$t('message.header.dataPortal')}` },
          { name: 'keywords', vmid: 'keywords', content: `${GLUE_CONFIG.keywords} ${this.$t('message.header.navigation.data.datasets')}}` },
          { property: 'robots', content: 'follow,noindex' },
        ],
      };
    },
    data() {
      return {
        autocompleteData: {
          suggestions: {},
          show: true,
        },
        debouncedOnBottomScroll: debounce(this.onBottomScroll, 500),
        facetFields: [],
        lang: this.locale,
        query: '',
        sortSelected: 'relevance+desc, modification_date+desc, title.en+asc',
        sortSelectedLabel: this.$t('message.sort.lastUpdated'),
        filterCollapsed: true,
        catalogAllowed: false,
      };
    },
    computed: {
      ...mapGetters('datasets', [
        'getDatasets',
        'getDatasetsCount',
        'getFacets',
        'getLimit',
        'getLoading',
        'getOffset',
        'getPage',
        'getPageCount',
        'getAvailableFacets',
      ]),
      ...mapGetters('auth', [
        'securityAuth',
        'getRTPToken',
      ]),
      /**
       * @description Returns the current page.
       * @returns {Number}
       */
      page() {
        return this.$route.query.page;
      },
      /**
       * @description Returns the active facets.
       * @returns {Object}
       */
      facets() {
        const facets = {};
        for (const field of this.facetFields) {
          let urlFacets = this.$route.query[field];
          if (!urlFacets) urlFacets = [];
          else if (!Array.isArray(urlFacets)) urlFacets = [urlFacets];
          facets[field] = urlFacets;
        }
        return facets;
      },
      authenticated() {
        if (!this.getRTPToken) return false;
        const decoded = decode(this.getRTPToken);
        let isAuthenticated = false;
        // Go through all catalogues and look for update permission
        decoded.authorization.permissions.forEach((permission) => {
          if (permission.scopes.find(scope => scope === 'update')) {
            if (permission.rsname.replace('https://europeandataportal.eu/id/catalogue/', '') === this.$route.query.catalog) {
              this.catalogAllowed = true;
            }
            isAuthenticated = true;
          }
        });
        return isAuthenticated;
      },
      currentSearchQuery() {
        return this.$route.query.query;
      },
    },
    methods: {
      ...mapActions('datasets', [
        'autocompleteQuery',
        'loadDatasets',
        'loadAdditionalDatasets',
        'setQuery',
        'setPage',
        'useService',
        'addFacet',
        'removeFacet',
        'setFacets',
        'setFacetOperator',
        'setFacetGroupOperator',
        'setPageCount',
        'setSort',
        'setLoading',
        'resetGeoBounds',
      ]),
      // The imported Lodash has function. Must be defined in Methods so we can use it in template
      has,
      getTranslationFor,
      getCountryFlagImg,
      autocomplete(query) {
        this.autocompleteQuery(query)
          .then((response) => {
            this.autocompleteData.suggestions = [];
            const suggestions = response.data.result;
            const displayedSuggestions = [];
            for (const ds of suggestions.results) {
              displayedSuggestions.push(ds);
            }
            this.autocompleteData.suggestions = displayedSuggestions;
            this.autocompleteData.show = query.length !== 0;
          })
          .catch(() => {});
      },
      handleSuggestionSelection(suggestion) {
        /* eslint-disable no-underscore-dangle */
        this.$router.push({ path: this.$route.path.slice(-1) === '/' ? `${this.$route.path}${suggestion.idName}` : `${this.$route.path}/${suggestion.idName}` });
      },
      changePageTo(page) {
        this.$router.replace({ query: Object.assign({}, this.$route.query, { page }) });
        this.scrollTo(0, 0);
      },
      /**
       * @description Handler-function for the scroll event.
       */
      onScroll() {
        const items = this.$el.querySelectorAll('.dataset');
        const lastItem = items[items.length - 1];
        if (lastItem) {
          const lastItemPos = lastItem.getBoundingClientRect();
          if (lastItemPos.bottom - window.innerHeight <= 0) {
            this.debouncedOnBottomScroll();
          }
        }
      },
      /**
       * @description Handler-function when bottom of the page is reached.
       */
      onBottomScroll() {
        this.$nextTick(() => {
          this.$Progress.start();
          this.loadAdditionalDatasets()
            .then(() => {
              this.$Progress.finish();
            })
            .catch(() => {
              this.$Progress.fail();
            });
        });
      },

      /**
       * @description The the current scroll-level to a given point.
       * @param x {Number} - The x-position to scroll to
       * @param y {Number} - The y-position to scroll to
       */
      scrollTo(x, y) {
        window.scrollTo(x, y);
      },
      /**
       * @description Removes the duplicates of the given array
       * @param array {Array} - The array to remove duplicates from
       * @returns {Array}
       */
      removeDuplicatesOf(array) {
        // lodash uniqBy funtion to remove duplicate id´s from array of objects
        return uniqBy(array, 'id');
      },
      /**
       * @description Determines the current page.
       */
      initPage() {
        const page = parseInt(this.$route.query.page, 10);
        if (page > 0) this.setPage(page);
        else this.setPage(1);
      },
      /**
       * @description Initialize the query String by checking the route parameters
       */
      initQuery() {
        let query = this.$route.query.query;
        if (!query) {
          query = '';
          this.setQuery('');
        } else {
          this.query = query;
          this.setQuery(query);
        }
      },
      /**
       * @descritption Initialize the active facets by checking the route parameters
       */
      initFacets() {
        const fields = ['country', 'catalog', 'categories', 'keywords', 'format', 'licence'];
        for (const field of fields) {
          this.facetFields.push(field);
          if (!Object.prototype.hasOwnProperty.call(this.$route.query, [field])) {
            this.$router.replace({
              query: Object.assign({}, this.$route.query, { [field]: [] }),
            });
          } else {
            for (const facet of this.$route.query[field]) {
              this.addFacet({ field, facet });
            }
          }
        }
      },
      initFacetOperator() {
        // Always set facet operator to AND when in catalogue details mode
        if (this.$route.query.showcataloguedetails === 'true') this.setFacetOperator('AND');
        else {
          const op = this.$route.query.facetOperator;
          if (op === 'AND' || op === 'OR') this.setFacetOperator(op);
        }
      },
      initFacetGroupOperator() {
        // The facetGroupOperator should be the same as the facetOperator
        // Always set facet operator to AND when in catalogue details mode
        if (this.$route.query.showcataloguedetails === 'true') this.setFacetGroupOperator('AND');
        else {
          const op = this.$route.query.facetOperator;
          if (op === 'AND' || op === 'OR') this.setFacetGroupOperator(op);
        }
      },
      initSort() {
        let sort = this.$route.query.sort;
        if (sort) {
          sort = sort.split(',')[0].toLowerCase();
          if (sort === 'relevance+desc') this.sortSelectedLabel = this.$t('message.sort.relevance');
          if (sort.includes('title') && sort.includes('asc')) this.sortSelectedLabel = this.$t('message.sort.nameAZ');
          if (sort.includes('title') && sort.includes('desc')) this.sortSelectedLabel = this.$t('message.sort.nameZA');
          if (sort === 'modification_date+desc') this.sortSelectedLabel = this.$t('message.sort.lastUpdated');
          if (sort === 'release_date+desc') this.sortSelectedLabel = this.$t('message.sort.lastCreated');
          this.sortSelected = sort;
        }
      },
      getFileTypeColor(format) {
        return fileTypes.getFileTypeColor(format);
      },
      setSortMethod(method, order, label) {
        this.sortSelectedLabel = label;
        this.sortSelected = `${method}+${order}`;
      },
      getFeedLink(format) {
        return `/data/search/${this.$i18n.locale}/feeds/datasets.${format}`;
      },
      changeQuery(query) {
        this.$router.replace({ query: Object.assign({}, this.$route.query, { query }, { page: 1 }) });
        this.setQuery(query);
      },
    },
    watch: {
      /**
       * @descritpion Watcher for active facets
       */
      // eslint-disable-next-line object-shorthand
      facets: {
        handler(facets) {
          this.setFacets(facets);
        },
        deep: true,
      },
      // eslint-disable-next-line object-shorthand
      page(pageStr) {
        const page = parseInt(pageStr, 10);
        if (page > 0) this.setPage(page);
        else this.setPage(1);
      },
      /**
       * @description Watcher for the routes query params.
       * @param query
       */
      // query(query) {
      //   // this.autocomplete(query);
      //   this.$router.replace({ query: Object.assign({}, this.$route.query, { query }) });
      //   this.setQuery(query);
      // },
      sortSelected: {
        handler(sort) {
          this.$router.replace({ query: Object.assign({}, this.$route.query, { sort }) });
          this.setSort(sort);
        },
        deep: true,
      },
    },
    created() {
      this.useService(this.DatasetService);
      this.initPage();
      this.initQuery();
      this.initSort();
      this.initFacetOperator();
      this.initFacetGroupOperator();
      this.initFacets();
      this.$nextTick(() => {
        this.$Progress.start();
        this.loadDatasets({})
          .then(() => {
            this.setPageCount(Math.ceil(this.getDatasetsCount / this.getLimit));
            this.$Progress.finish();
            // $('[data-toggle="tooltip"]').tooltip({
            //   container: 'body',
            // });
          })
          .catch(() => {
            // eslint-disable-next-line no-console
            this.$Progress.fail();
          });
      });
      if (this.infiniteScrolling) window.addEventListener('scroll', this.onScroll);
    },
    mounted() {
    },
    beforeDestroy() {
      if (this.infiniteScrolling) window.removeEventListener('scroll', this.onScroll);
    },
  };
</script>

<style lang="scss" scoped>
  @import '~@/styles/bootstrap_theme';
  @import '~@/styles/utils/css-animations';

  .suggestion-input-group {
    position: relative;
  }
  .suggestion-input {
    position: absolute;
    top: 0;
  }
  .suggestion-list-group {
    position: relative;
    width: 100%;
  }
  .suggestion-list {
    width: 100%;
    position: absolute;
    top: 0;
    z-index: 100;
  }

  /*** MATERIAL ICONS ***/
  .material-icons.small-icon {
    font-size: 20px;
  }

  @media screen and (min-width:768px) {
    .display-dataset-facets[style] {
      display: block!important;
    }
  }
</style>
