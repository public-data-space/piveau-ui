<!-- This component should be used for every link that should be copied to clipboard on click -->

<template>
  <div class="input-group input-group-sm w-50">
    <div class="input-group-prepend">
      <a
        :target="link.target"
        :href="link.url"
      >
        <button
          class="btn btn-sm btn-outline-secondary"
          type="button"
        >
          {{ link.title }}
        </button>
      </a>
    </div>
    <input
      ref="linkTextInput"
      type="text"
      class="form-control border-secondary"
      aria-label="Url to copy"
      :value="link.url"
      readonly
      @focus="$event.target.select()"
    >
    <div class="input-group-append">
      <button
        class="btn btn-outline-secondary"
        type="button"
        title="copy"
        @click="copyLink()"
      >
        <i class="material-icons">content_copy</i>
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LinkCopyBar',
    components: {},
    props: {
      /*
       * @example [{
       *  title: 'Download',
       *  url: 'https://lol.de',
       * }]
       */
      link: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {};
    },
    computed: {},
    created() {},
    mounted() {},
    beforeDestroy() {
    },
    methods: {
      copyLink() {
        this.$refs.linkTextInput.select();
        document.execCommand('Copy');
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '~@/styles/bootstrap_theme';

  .material-icons {
    font-size: 1em;
  }
</style>
