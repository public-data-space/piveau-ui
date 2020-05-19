// Facet item component displaying text and count

<template>
  <button
    :title="tooltip"
  >
    <span
      ref="facetBtn"
      class="text-truncate"
    >{{ title }}</span>
    <span class="facet-count badge">{{ count | formatNumber }}</span>
  </button>
</template>

<script>
export default {
  name: 'DatasetFacetsItem',
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
  props: {
    title: {
      type: String,
      default: '',
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      tooltip: '',
    };
  },
  mounted() {
    // Sets tooltip text to title when title itself is rendered truncated
    this.tooltip = this.$refs.facetBtn.offsetWidth < this.$refs.facetBtn.scrollWidth
      ? this.title
      : '';
  },
};
</script>

<style>

</style>