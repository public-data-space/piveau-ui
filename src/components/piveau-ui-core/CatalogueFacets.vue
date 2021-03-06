<template>
  <div class="container catalogue-facets">
    <div class="row mx-3 mr-md-0">
      <div class="col">
        <div class="row facet-field mb-3">
          <div class="col list-group pr-0">
            <a class="list-group-item facet-header-item">
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
        <div
          v-for="(field, index) in getAvailableFacets"
          v-if="field.items.length > 0 && field.title === 'Countries'"
          :key="index"
          class="row facet-field mb-3"
          :class="{'mt-3': (index > 0)}"
        >
          <div class="col list-group pr-0">
            <a class="list-group-item facet-header-item">
              <span class="facet-title">{{ $t(`message.datasetFacets.facets.${field.title.toLowerCase()}`) }}</span>
            </a>
            <button
              v-for="(facet, index) in sortByCount(field.items)"
              v-if="isExpanded(field.title) ? (index <= limits.max) : (index <= limits.min)"
              :key="index"
              class="facet list-group-item list-group-item-action d-flex justify-content-between align-items-center"
              :class="{active: facetIsSelected(field.id, facet.id)}"
              @click="facetClicked(field.id, facet.id)"
            >
              {{ facet.title }}
              <span class="facet-count badge">{{ facet.count }}</span>
            </button>
            <button
              v-if="field.items.length > limits.min"
              class="btn btn-primary"
              @click="toggleExpanded(field.title)"
            >
              <b-icon-chevron-down
                v-if="!isExpanded(field.title)"
                scale="1.5"
                class="material-icons expand-more animated"
              >
                expand_more
              </b-icon-chevron-down>
              <b-icon-chevron-up
                v-if="isExpanded(field.title)"
                scale="1.5"
                class="material-icons expand-less animated"
              >
                expand_less
              </b-icon-chevron-up>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  // Import custom helpers
  import {
    isEmpty,
    isBoolean,
    has,
    isNil,
  } from 'lodash';
  import { getTranslationFor, getCountryFlagImg } from '@/utils/helpers';
  /* The minimum amount of facets to show for one category before hiding results */
  const MIN_FACET_LIMIT = 50;
  /* The maximum amount of facets to show for one category */
  const MAX_FACET_LIMIT = 100;
  /* Enum for possible Facet operators */
  const FACET_OPERATORS = Object.freeze({ or: 'OR', and: 'AND' });
  /* Enum for possible Facet group operators */
  const FACET_GROUP_OPERATORS = Object.freeze({ or: 'OR', and: 'AND' });

  export default {
    name: 'CatalogueFacets',
    components: {},
    data() {
      return {
        limits: {
          min: MIN_FACET_LIMIT,
          max: MAX_FACET_LIMIT,
        },
        facetOperators: FACET_OPERATORS,
        expanded: [],
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
      ...mapGetters('catalogues', [
        'getAvailableFacets',
        'getCataloguesCount',
        'getFacetOperator',
        'getFacetGroupOperator',
        'getLimit',
        'getPage',
      ]),
      facetOperatorWatcher() {
        return this.getFacetOperator;
      },
      facetGroupOperatorWatcher() {
        return this.getFacetGroupOperator;
      },
    },
    methods: {
      isEmpty,
      isBoolean,
      has,
      isNil,
      getCountryFlagImg,
      getTranslationFor,
      ...mapActions('catalogues', [
        'toggleFacet',
        'addFacet',
        'removeFacet',
        'setFacetOperator',
        'setFacetGroupOperator',
        'setPage',
        'setPageCount',
      ]),
      /**
       * @description Sorts an array of facets by their count.
       * @param {Array<Object>} facets - The facets to sort
       * @param {Number} facet.count - The amount of catalogues having this facet assigned
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
      toggleFacetGroupOperator() {
        let op = this.getFacetGroupOperator;
        op = op === FACET_GROUP_OPERATORS.and ? FACET_GROUP_OPERATORS.or : FACET_GROUP_OPERATORS.and;
        this.setFacetGroupOperator(op);
      },
      resetPage() {
        this.$router.replace({ query: Object.assign({}, this.$route.query, { page: 1 }) });
      },
      triggerResize() {
        // Note: Trigger resize after 200ms when Modal element is visible to properly display the map component
        setTimeout(() => {
          window.dispatchEvent(new Event('resize'));
        }, 200);
      },
    },
    watch: {
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
    },
    created() {},
    mounted() {
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

  .map-modal-button {
    position: absolute;
    bottom: 0;
    right: 0;
  }

  .reset-bounds-button {
    position: absolute;
    bottom: 0;
    left: 0;
  }

  #modal-map-wrapper {
    padding-right: 1.5rem !important;
    padding-left: 1.5rem !important;
  }

</style>
