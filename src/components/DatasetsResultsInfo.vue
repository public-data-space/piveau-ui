/*
Component for displaying the number of search results and buttons for sorting
*/

<template>
  <div class="result-count-container d-sm-flex justify-content-between align-items-end mt-3 pb-3 border-bottom">
    <div class="text-grey" v-if="resultCount>1">
      {{ isLoading ? loadingMessage:`${resultCount}
            ${countMessage}` }}
    </div>
    <div class="text-grey" v-else-if="resultCount===0">
      {{ isLoading ? loadingMessage:`${countMessageNoResult}` }}
    </div>
    <div v-else>
          {{ isLoading ? loadingMessage:`${resultCount}
                      ${countMessageSingular}` }}
    </div>
    <div>
      <b-button-group class="sort-by-container">
        <b-button
          variant="outline-primary"
          size="md"
          :class="{'sort-active': currentSort === 'modification_date+desc'}"
          @click="setSortMethod('modification_date', 'desc')"
        >
          {{ $t('message.sort.lastUpdated') }}
        </b-button>
        <b-button
          variant="outline-primary"
          size="md"
          :class="{'sort-active': currentSort === 'relevance+desc'}"
          @click="setSortMethod('relevance', 'desc')"
        >
          {{ $t('message.sort.relevance') }}
        </b-button>
        <b-dropdown
          id="dropdown-sort"
          variant="outline-primary"
          size="md"
          right
          class="more-sort"
        >
          <b-dropdown-item
            @click="setSortMethod(`title.${$i18n.locale}`, 'asc')"
          >
            <span :class="{'sort-active': currentSort === `title.${$i18n.locale}+asc`}">
              {{ $t('message.sort.nameAZ') }}
            </span>
          </b-dropdown-item>
          <b-dropdown-item
            @click="setSortMethod(`title.${$i18n.locale}`, 'desc')"
          >
            <span :class="{'sort-active': currentSort === `title.${$i18n.locale}+desc`}">
              {{ $t('message.sort.nameZA') }}
            </span>
          </b-dropdown-item>
          <b-dropdown-item
            @click="setSortMethod('release_date', 'desc')"
          >
            <span :class="{'sort-active': currentSort === 'release_date+desc'}">
              {{ $t('message.sort.lastCreated') }}
            </span>
          </b-dropdown-item>
        </b-dropdown>
      </b-button-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DatasetsResultsInfo',
  props: {
    loadingMessage: {
      type: String,
      default: "",
      required: true,
    },
    countMessage: {
      type: String,
      default: "",
      required: true,
    },
    countMessageSingular: {
      type: String,
      default: "",
      required: true,
    },
    countMessageNoResult: {
      type: String,
      default: "",
      required: true,
    },
    resultCount: {
      type: Number,
      default: 0,
      required: true,
    },
    sortQuery: {
      type: String,
      default: '',
      required: true,
    },
    isLoading: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    currentSort() {
      // Computes the first (primary) sort query
      // Recall that sort queries may be like 'relevance+desc, modification_date+desc, title.en+asc'
      return this.sortQuery.split(',')[0]
    }
  },
  methods: {
    setSortMethod(method, order) {
      // eslint-disable-next-line
      this.$router.replace({ query: Object.assign({}, this.$route.query, { sort: `${method}+${order}` }) });
    },
  }
}
</script>

<style scoped lang="scss">
  @import '~@/styles/bootstrap_theme.scss';

  .result-count-container {
    .sort-by-container {
      .btn {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        &.sort-active:not(:hover) {
          background-color: lighten($primary, 53%);
        }
      }
      .btn:first-child {
        border-top-left-radius: $border-radius;
        border-bottom-left-radius: $border-radius;
      }
      .more-sort {
        /deep/ .btn {
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
          border-top-right-radius: $border-radius;
          border-bottom-right-radius: $border-radius;
        }
        .sort-active {
          font-weight: $font-weight-bold;
        }
      }
    }
  }
</style>
