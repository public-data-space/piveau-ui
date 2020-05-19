<template>
  <div class="container dataset-facets">
    <div class="row mx-3 mr-md-0">
      <div class="col">
        <!-- Location suggestions and Map START-->
        <div
          v-if="!showCatalogueDetails"
          class="row"
        >
          <b-input-group
            v-if="false"
            class="mb-2"
          >
            <b-form-input
              v-model="gazetteer.searchbarText"
              type="text"
              class=""
              list="search-autocomplete-geo"
              :aria-label="$t('message.datasets.findLocation')"
              :placeholder="$t('message.datasets.findLocation')"
              @focus="gazetteer.selected = false; gazetteer.searchbarText = ''"
              @onblur="gazetteer.selected = true"
              @input="getAutocompleteSuggestions(gazetteer.searchbarText)"
              @keyup.enter="getAutocompleteSuggestions(gazetteer.searchbarText)"
            />
            <b-input-group-append>
              <button class="btn btn-sm btn-primary">
                <b-icon-search
                  font-scale="1.5"
                  class="material-icons align-bottom"
                >
                  search
                </b-icon-search>
              </button>
            </b-input-group-append>
          </b-input-group>
          <div
            v-if="gazetteer && !gazetteer.selected"
            class="suggestion-list-group"
          >
            <b-list-group class="list-group suggestion-list">
              <b-list-group-item
                v-for="(suggestion, i) in gazetteer.suggestions.slice(0, 9)"
                :key="i"
                class="list-group-item list-group-item-action"
                @click="handleSuggestionSelection(suggestion)"
              >
                {{ suggestion.name }}
              </b-list-group-item>
            </b-list-group>
          </div>
        </div>
        <div
          v-if="!showCatalogueDetails"
          class="row position-relative mb-3"
        >
          <map-bounds-receiver
            ref="mapReceiver"
            class="border-secondary map"
            width="100%"
            :bounds-id="geoBoundsId"
          />
          <Button
            v-if="getGeoBoundsById(geoBoundsId)"
            class="btn btn-highlight reset-bounds-button"
            @click="resetBoundsFor(geoBoundsId)"
          >
            Reset Bounds
          </Button>
          <Button
            v-b-modal.map-modal
            class="btn btn-sm btn-secondary map-modal-button"
            @click="triggerResize()"
          >
            <b-icon-arrows-fullscreen class="material-icons">
              fullscreen
            </b-icon-arrows-fullscreen>
          </Button>
          <!-- Modal Map Start -->
          <b-modal
            id="map-modal"
            static
            class="w-75"
            size="xl"
            hide-footer
            :title="$t('message.mapModal.drawRectangleMsg')"
            tabindex="-1"
            role="dialog"
            aria-labelledby="Large map view"
            aria-hidden="true"
          >
            <div class="modal-body d-flex flex-row flex-wrap p-md-3 p-0">
              <map-bounds-sender
                ref="mapSender"
                :bounds-id="geoBoundsId"
                map-container-id="modalMap"
              />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-danger"
                data-dismiss="modal"
              >
                {{ $t('message.mapModal.close') }}
              </button>
              <button
                type="button"
                class="btn btn-highlight"
                @click="resetBoundsFor(geoBoundsId)"
              >
                {{ $t('message.mapModal.reset') }}
              </button>
              <button
                type="button"
                class="btn btn-primary"
                data-dismiss="modal"
                @click="applyHoldedBounds()"
              >
                {{ $t('message.mapModal.findDatasets') }}
              </button>
            </div>
          </b-modal>
          <!-- Modal Map End -->
        </div>
        <!-- Location suggestions and Map END-->
        <!-- Catalogue Details START-->
        <div
          v-if="showCatalogueDetails"
          class="row position-relative"
        >
          <span class="px-3">
            <img
              v-if="has(catalogue, 'country.id')"
              :src="getCountryFlagImg(catalogue.country.id)"
              class="catalogue-flag border border-dark"
              width="100%"
              :alt="catalogue.country.id"
            >
          </span>
          <div
            v-if="!isEmpty(catalogue) && has(catalogue, 'languages')"
            class="col mt-3"
          >
            <dl class="small">
              <dt>{{ $t('message.metadata.title') }}</dt>
              <dd>{{ `${getTranslationFor(catalogue.title, $i18n.locale, catalogue.languages) || catalogue.id}` }}</dd>
              <dt v-if="has(catalogue, 'description')">
                {{ $t('message.metadata.description') }}
              </dt>
              <dd v-if="has(catalogue, 'description')">
                {{ `${getTranslationFor(catalogue.description, $i18n.locale, catalogue.languages)}` }}
              </dd>
              <dt
                v-if="has(catalogue, 'publisher') &&
                  (has(catalogue, 'publisher.name') || has(catalogue, 'publisher.email'))"
              >
                {{ $t('message.metadata.publisher') }}
              </dt>
              <dd v-if="has(catalogue, 'publisher.name')">
                {{ `${catalogue.publisher.name}` }}
              </dd>
              <a
                v-if="has(catalogue, 'publisher.email') && !isNil(catalogue.publisher.email)"
                :href="catalogue.publisher.email"
              >
                <dd>{{ `${catalogue.publisher.email}` }}</dd>
              </a>
            </dl>
          </div>
        </div>
        <!-- Catalogue Details END -->
        <!--Facet settings-->
        <div
          v-if="!showCatalogueDetails"
          class="row facet-field"
        >
          <div class="col list-group pr-0">
            <a class="facet-header-item list-group-item">
              <span class="facet-title">{{ $t('message.datasetFacets.settings') }}</span>
            </a>
            <div class="form-group list-group-item list-group-item-action d-flex justify-content-between align-items-center">
              {{ $t('message.datasetFacets.operator') }}
              <span
                v-if="!browser.isIE"
                class="switch switch-sm"
              >
                <label
                  class="mr-1"
                  for="switch-facet-operator"
                >{{ $t('message.datasetFacets.and') }}</label>
                <input
                  id="switch-facet-operator"
                  type="checkbox"
                  class="switch-sm"
                  :checked="getFacetOperator === 'OR'"
                  @click="toggleFacetOperator"
                >
                <label for="switch-facet-operator">{{ $t('message.datasetFacets.or') }}</label>
              </span>
              <span v-if="browser.isIE">
                <div class="form-check form-check-inline">
                  <input
                    id="radio-and"
                    type="radio"
                    class="form-check-input"
                    name="radio-facet-operator"
                    :checked="getFacetOperator === facetOperators.and"
                    @click="changeFacetOperator(facetOperators.and)"
                  >
                  <label
                    for="radio-and"
                    class="form-check-label"
                  >{{ $t('message.datasetFacets.and') }}</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    id="radio-or"
                    type="radio"
                    class="form-check-input"
                    name="radio-facet-operator"
                    :checked="getFacetOperator === facetOperators.or"
                    @click="changeFacetOperator(facetOperators.or)"
                  >
                  <label
                    for="radio-or"
                    class="form-check-label"
                  >{{ $t('message.datasetFacets.or') }}</label>
                </div>
              </span>
            </div>
          </div>
        </div>
        <div class="d-none d-md-block">
          <div
            v-for="(field, index) in getAvailableFacets"
            v-if="field.items.length > 0 && (field.id !== 'catalog' || (showCatalogueFacets === (field.id === 'catalog')))"
            :key="index"
            class="row facet-field mb-3"
            :class="{'mt-3': (index > 0)}"
          >
            <div class="col list-group pr-0">
              <a class="d-none d-md-block facet-header-item list-group-item">
                <span class="facet-title mb-0">{{ $t(`message.datasetFacets.facets.${field.title.toLowerCase()}`) }}</span>
              </a>
              <a
                class="d-flex d-md-none list-group-item justify-content-between align-items-baseline"
                @click="toggleExpanded(field.title)"
              >
                <h4 class="mb-0">{{ $t(`message.datasetFacets.facets.${field.title.toLowerCase()}`) }}</h4>
                <button class="d-none d-md-block btn btn-primary">
                  <b-icon-chevron-down
                    v-if="!isExpanded(field.title)"
                    scale="1.5"
                    class="material-icons small-icon expand-more animated"
                  >expand_more</b-icon-chevron-down>
                  <b-icon-chevron-up
                    v-if="isExpanded(field.title)"
                    scale="1.5"
                    class="material-icons small-icon expand-less animated"
                  >expand_less</b-icon-chevron-up>
                </button>
              </a>
              <dataset-facets-item
                v-for="(facet, index) in sortByCount(field.items)"
                v-if="isExpanded(field.title) ? (index <= limits.max) : (index <= limits.min - 1)"
                class="d-none d-md-flex facet list-group-item list-group-item-action justify-content-between align-items-center"
                :title="facet.title"
                :count="facet.count"
                :class="{active: facetIsSelected(field.id, facet.id)}"
                @click.native="facetClicked(field.id, facet.id)" 
              />
              <button
                v-if="field.items.length > limits.min"
                class="d-none d-md-block btn btn-primary"
                @click="toggleExpanded(field.title)"
              >
                <b-icon-chevron-down
                  v-if="!isExpanded(field.title)"
                  scale="1.5"
                  class="material-icons small-icon expand-more animated"
                >
                  expand_more
                </b-icon-chevron-down>
                <b-icon-chevron-up
                  v-if="isExpanded(field.title)"
                  scale="1.5"
                  class="material-icons small-icon expand-less animated"
                >
                  expand_less
                </b-icon-chevron-up>
              </button>
            </div>
          </div>
        </div>
        <div class="d-block d-md-none">
          <div
            v-for="(field, index) in getAvailableFacets"
            v-if="field.items.length > 0 && (field.id !== 'catalog' || (showCatalogueFacets === (field.id === 'catalog')))"
            :key="index"
            class="row facet-field mt-3"
            :class="{'mt-3': (index > 0)}"
          >
            <div class="col list-group pr-0">
              <a class="list-group-item d-flex justify-content-between align-items-baseline">
                <h4 class="mb-0">{{ $t(`message.datasetFacets.facets.${field.title.toLowerCase()}`) }}</h4>
                <button
                  class="btn"
                  @click="toggleExpanded(field.title)"
                >
                  <b-icon-chevron-down
                    v-if="!isExpanded(field.title)"
                    scale="1.5"
                    class="material-icons small-icon align-bottom expand-more animated"
                  >expand_more</b-icon-chevron-down>
                  <b-icon-chevron-up
                    v-if="isExpanded(field.title)"
                    scale="1.5"
                    class="material-icons small-icon expand-less animated"
                  >expand_less</b-icon-chevron-up>
                </button>
              </a>
              <button
                v-for="(facet, index) in sortByCount(field.items)"
                v-if="isExpanded(field.title)"
                :key="index"
                class="facet list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                :class="{active: facetIsSelected(field.id, facet.id)}"
                @click="facetClicked(field.id, facet.id)"
              >
                <span class="text-truncate">{{ facet.title }}</span>
                <span class="facet-count badge">{{ facet.count }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import DatasetFacetsItem from '@/components/DatasetFacetsItem';
  // Import custom helpers
  import {
    isEmpty,
    isBoolean,
    has,
    isNil,
  } from 'lodash';
  import MapBoundsSender from './MapBoundsSender';
  import { getTranslationFor, getCountryFlagImg } from '@/utils/helpers';
  import { glueConfig as GLUE_CONFIG }from '@/../config/user-config';
  /* The minimum amount of facets to show for one category before hiding results */
  const MIN_FACET_LIMIT = 10;
  /* The maximum amount of facets to show for one category */
  const MAX_FACET_LIMIT = 50;
  /* Enum for possible Facet operators */
  const FACET_OPERATORS = Object.freeze({ or: 'OR', and: 'AND' });
  /* Enum for possible Facet group operators */
  const FACET_GROUP_OPERATORS = Object.freeze({ or: 'OR', and: 'AND' });

  // Code split footer since they are not in page view initially
  const MapBoundsReceiver = () => import(/* webpackChunkName: "MapBoundsReceiver" */'./MapBoundsReceiver');

  export default {
    name: 'DatasetFacets',
    dependencies: ['GazetteerService', 'CatalogueService'],
    components: {
      DatasetFacetsItem,
      MapBoundsSender,
      MapBoundsReceiver,
    },
    metaInfo() {
      const catalogueTitle = this.getTranslationFor(this.catalogue.title, this.$i18n.locale, this.catalogue.languages) || this.catalogue.id;
      const catalogueDescription = this.getTranslationFor(this.catalogue.description, this.$i18n.locale, this.catalogue.languages) || this.catalogue.id;
      const title = this.currentSearchQuery
        ? `${this.currentSearchQuery}${this.showCatalogueDetails ? ` - ${catalogueTitle}` : ''}`
        : `${this.showCatalogueDetails ? catalogueTitle : this.$t('message.header.navigation.data.datasets')}`;
      return {
        title,
        meta: [
          { name: 'description', vmid: 'description', content: this.showCatalogueDetails ? catalogueDescription : `${this.$t('message.header.navigation.data.datasets')} - ${this.$t('message.header.european')} ${this.$t('message.header.dataPortal')}` },
          { name: 'keywords', vmid: 'keywords', content: this.showCatalogueDetails ? `${GLUE_CONFIG.keywords} ${this.$t('message.header.navigation.data.catalogues')}` : `${GLUE_CONFIG.keywords} ${this.$t('message.header.navigation.data.datasets')}` },
          { property: 'robots', content: 'follow,noindex' },
        ],
      };
    },
    data() {
      return {
        limits: {
          min: MIN_FACET_LIMIT,
          max: MAX_FACET_LIMIT,
        },
        facetOperators: FACET_OPERATORS,
        expanded: [],
        gazetteer: {
          searchbarText: '',
          suggestions: [],
          selected: true,
          bounds: [],
        },
        geoBoundsId: 'ds-search-bounds',
        showCatalogueDetails: false,
        catalogue: {},
        // Browser detection source: https://stackoverflow.com/a/9851769/6369868
        browser: {
          /* eslint-disable-next-line */
          isIE: /*@cc_on!@*/false || !!document.documentMode,
        },
      };
    },
    computed: {
      ...mapGetters('catalogueDetails', [
        'getCatalogue',
      ]),
      ...mapGetters('datasets', [
        'getAvailableFacets',
        'getDatasetsCount',
        'getFacetOperator',
        'getFacetGroupOperator',
        'getLimit',
        'getPage',
        'getDatasetGeoBounds',
      ]),
      ...mapGetters('geo', [
        'getGeoBoundsById',
        'getHoldedGeoBoundsById',
      ]),
      ...mapGetters('gazetteer', [
        'getSuggestions',
      ]),
      geoStateBoundsWatcher() {
        return this.getGeoBoundsById(this.geoBoundsId);
      },
      datasetBoundsWatcher() {
        return this.getDatasetGeoBounds;
      },
      facetOperatorWatcher() {
        return this.getFacetOperator;
      },
      facetGroupOperatorWatcher() {
        return this.getFacetGroupOperator;
      },
      catalogueWatcher() {
        return this.getCatalogue;
      },
      showCatalogueDetailsWatcher() {
        return this.$route.query.showcataloguedetails;
      },
      showCatalogueFacets() {
        // Dont show Catalog(ue) facets when in catalogue details mode.
        return !this.showCatalogueDetails;
      },
      currentSearchQuery() {
        return this.$route.query.query;
      },
    },
    filters: {
      formatNumber(value) {
        if (!value) return '';
        const formatted = Math.floor(value / 1000);
        if (formatted >= 10) {
          return `${formatted}K`;
        }
        return value;
      },
    },
    methods: {
      isEmpty,
      isBoolean,
      has,
      isNil,
      getCountryFlagImg,
      getTranslationFor,
      ...mapActions('catalogueDetails', [
        'loadCatalogue',
        'useCatalogueService',
      ]),
      ...mapActions('datasets', [
        'toggleFacet',
        'addFacet',
        'removeFacet',
        'setFacetOperator',
        'setFacetGroupOperator',
        'setPage',
        'setPageCount',
        'setDatasetGeoBounds',
      ]),
      ...mapActions('geo', [
        'setGeoBoundsForId',
        'resetGeoBoundsForId',
        'resetHoldedGeoBoundsForId',
      ]),
      ...mapActions('gazetteer', [
        'autocomplete',
        'useService',
      ]),
      /**
       * @description Sorts an array of facets by their count.
       * @param {Array<Object>} facets - The facets to sort
       * @param {Number} facet.count - The amount of datasets having this facet assigned
       * @param {String} facet.name - The name of this facet
       * @returns {Array<Object>}
       */
      sortByCount(facets) {
        return facets.slice().sort((a, b) => {
          const n = b.count - a.count;
          if (n !== 0) return b.count - a.count;
          if (a.name < b.name) return -1;
          return 1;
        });
      },
      /**
       * @description Returns whether a facet-field is expanded or not.
       * @param {String} field - The given facet-field.
       * @returns {boolean}
       */
      isExpanded(field) {
        return this.expanded.indexOf(field) > -1;
      },
      /**
       * @description Expands/Collapses a facet-field.
       * @param field - The given facet-field
       */
      toggleExpanded(field) {
        const index = this.expanded.indexOf(field);
        if (index > -1) this.expanded.splice(index);
        else this.expanded.push(field);
      },
      /**
       * @description Returns whether a facet is selected or not.
       * @param field - The field of the facet to check.
       * @param facet - The facet to check.
       * @returns {boolean}
       */
      facetIsSelected(field, facet) {
        if (!Object.prototype.hasOwnProperty.call(this.$route.query, field)) {
          return false;
        }
        let qField = this.$route.query[field];
        if (!Array.isArray(qField)) qField = [qField];
        return qField.indexOf(facet) > -1;
      },
      /**
       * @description Wrapping callback-function for a click on a facet.
       * @param field - The field of the clicked facet
       * @param facet - The clicked facet
       */
      facetClicked(field, facet) {
        this.toggleFacet(field, facet);
        this.resetPage();
      },
      /**
       * @description Add/Remove a facet from the routers query parameters.
       * @param field - The field of the facet
       * @param facet - The given facet
       */
      toggleFacet(field, facet) {
        if (!Object.prototype.hasOwnProperty.call(this.$route.query, [field])) {
          this.$router.push({ query: Object.assign({}, this.$route.query, { [field]: [] }) });
        }
        let facets = this.$route.query[field].slice();
        if (!Array.isArray(facets)) facets = [facets];
        const index = facets.indexOf(facet);
        if (index > -1) {
          facets.splice(index, 1);
        } else {
          facets.push(facet);
        }
        this.$router.push({ query: Object.assign({}, this.$route.query, { [field]: facets }) });
      },
      /**
       * @description Toggles the facetoperator between 'or'/'and'.
       */
      toggleFacetOperator() {
        let op = this.getFacetOperator;
        op = op === FACET_OPERATORS.and ? FACET_OPERATORS.or : FACET_OPERATORS.and;
        this.setFacetOperator(op);
        // facetGroupOperator should have the same value as facetOperator
        this.setFacetGroupOperator(op);
      },
      /**
       * @description Toggles the facetoperator between 'or'/'and'.
       */
      changeFacetOperator(op) {
        this.setFacetOperator(op);
        // facetGroupOperator should have the same value as facetOperator
        this.setFacetGroupOperator(op);
      },
      /**
       * @description Toggles the facetoperator between 'or'/'and'.
       */
      toggleFacetGroupOperator() {
        let op = this.getFacetGroupOperator;
        op = op === FACET_GROUP_OPERATORS.and ? FACET_GROUP_OPERATORS.or : FACET_GROUP_OPERATORS.and;
        this.setFacetGroupOperator(op);
      },
      resetPage() {
        this.$router.replace({ query: Object.assign({}, this.$route.query, { page: 1 }) });
      },
      applyHoldedBounds() {
        const holdedBounds = this.getHoldedGeoBoundsById(this.geoBoundsId);
        this.setGeoBoundsForId({
          bounds: holdedBounds,
          boundsId: this.geoBoundsId,
        });
      },
      resetBoundsFor(boundsId) {
        if (this.$refs.mapSender) this.$refs.mapSender.resetBounds()
        if (this.$refs.mapReceiver) this.$refs.mapReceiver.resetBounds()
        this.resetGeoBoundsForId(boundsId);
        this.resetHoldedGeoBoundsForId(boundsId);
      },
      getAutocompleteSuggestions(query) {
        if (!query || isNil(query)) this.clearAutocompleteSuggestions();
        else {
          this.autocomplete(query).then(() => {
            this.$nextTick(() => {
              this.gazetteer.suggestions = this.getSuggestions;
            });
          }).catch((e) => {
            if (e !== 'disabled') {
              // eslint-disable-next-line no-console
              console.error(e);
            }
          });
        }
      },
      clearAutocompleteSuggestions() {
        this.gazetteer.suggestions = [];
      },
      handleSuggestionSelection(suggestion) {
        this.gazetteer.searchbarText = suggestion.name;
        this.gazetteer.selected = true;
        const location = suggestion.geometry.split(',');
        this.gazetteer.bounds = [[location[1], location[0]], [location[3], location[2]]]
          .map(point => point.map(coord => parseFloat(coord)));
        this.setGeoBoundsForId({
          bounds: this.gazetteer.bounds,
          boundsId: this.geoBoundsId,
        });
      },
      triggerResize() {
        if (this.browser.isIE) {
          // Note: Trigger resize after 500ms (IE11 needs longer than modern browsers) in IE11 when Modal element is visible to properly display the map component
          setTimeout(() => {
            const evt = document.createEvent('UIEvents');
            evt.initUIEvent('resize', true, false, window, 0);
            window.dispatchEvent(evt);
          }, 500);
        } else {
          // Note: Trigger resize after 200ms when Modal element is visible to properly display the map component
          setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
          }, 200);
        }
      },
      initShowCatalogueDetails() {
        const showCatalogueDetails = this.$route.query.showcataloguedetails;
        if (showCatalogueDetails === 'true') {
          this.showCatalogueDetails = true;
          this.loadCatalogue(this.$route.query.catalog);
        } else this.showCatalogueDetails = false;
      },
    },
    watch: {
      geoStateBoundsWatcher: {
        deep: true,
        immediate: true,
        handler(bounds) {
          this.setDatasetGeoBounds(bounds);
        },
      },
      datasetBoundsWatcher: {
        deep: true,
        handler() {
        },
      },
      facetOperatorWatcher: {
        handler(facetOperator) {
          this.$router.replace({ query: Object.assign({}, this.$route.query, { facetOperator }) });
        },
      },
      facetGroupOperatorWatcher: {
        handler(facetGroupOperator) {
          this.$router.replace({ query: Object.assign({}, this.$route.query, { facetGroupOperator }) });
        },
      },
      showCatalogueDetailsWatcher: {
        handler(showCatalogueDetails) {
          this.showCatalogueDetails = showCatalogueDetails;
        },
      },
      catalogueWatcher: {
        handler(catalogue) {
          this.catalogue = catalogue;
        },
      },
    },
    created() {
      this.useService(this.GazetteerService);
      this.useCatalogueService(this.CatalogueService);
      this.initShowCatalogueDetails();
    },
    destroyed() {
    },
  };
</script>

<style lang="scss" scoped>
  @import '~@/styles/bootstrap_theme';

  .facet:hover {
    cursor: pointer;
  }

  .list-group {
    .facet-header-item {
      border-left: solid $primary;
    }
    .facet-title {
      font-weight: 600;
      font-size: 1.1rem;
    }
  }

  .map {
    z-index: 0;
  }
  .suggestion-input-group {
    position: relative;
  }
  .suggestion-input {
    // Position absolute is causing the input box to be invisible
    // position: absolute;
    position: relative;
    top: 0;
    height: 100%;
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

  .map-modal-button {
    position: absolute;
    bottom: 0;
    right: 0;
  }

  .modal-dialog {
    max-width: 100%!important;
  }

  .modal-content {
    min-height: 100%;
    min-height: 100vh;
  }

  #modalMap {
    display: flex;
    flex: 1 1;
    height: 80vh;
  }


  .reset-bounds-button {
    position: absolute;
    bottom: 0;
    left: 0;
  }

  /*** MATERIAL ICONS ***/
  .material-icons.small-icon {
    font-size: 20px;
  }
</style>
