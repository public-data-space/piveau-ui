<template>
  <div class="site-wrapper">
    <cookie-consent
      v-if="false"
      variant="primary"
      decline-jump-to-href=""
      :matomo-url="matomoURL"
    />
    <vue-progress-bar />
    <div style="display: flex;height: 100vh;flex-direction: column;">
      <the-header />
      <router-view
        :key="$route.fullPath"
        class="content-wrapper"
        style="min-width:1300px;margin-top: inherit;"
      />
      <the-footer />
    </div>
  </div>
</template>


<script>
  /* eslint-disable no-underscore-dangle */
  import TheHeader from '@/components/TheHeader';
  import { glueConfig as GLUE_CONFIG } from '@/../config/user-config';

  const CookieConsent = () => import ('@/components/piveau-ui-core/gdpr/CookieConsent');

  // Code split footer since they are not in page view initially
  const TheFooter = () => import(/* webpackChunkName: "bottom" */'@/components/TheFooter');

  export default {
    name: 'App',
    components: {
      CookieConsent,
      TheHeader,
      TheFooter,
    },
    metaInfo() {
      return {
        titleTemplate(chunk) {
          return chunk ? `${chunk} - ${GLUE_CONFIG.title}` : GLUE_CONFIG.title;
        },
        meta: [
          { name: 'description', vmid: 'description', content: GLUE_CONFIG.title },
          { name: 'keywords', vmid: 'keywords', content: GLUE_CONFIG.keywords },
        ],
        htmlAttrs: {
          lang: this.$i18n.locale,
        },
      };
    },
    data() {
      return {
        tracker: null,
        matomoURL: this.$env.api.matomoUrl,
        lastRoute: null,
      };
    },
    watch: {
      // eslint-disable-next-line no-unused-vars
      $route(to, from) {
        // Help Matomo track new page views.
        // Also gets triggered on initial page load.

        // router-link somehow makes this watcher trigger twice; Once immediately after the click
        // and once after the new view has loaded.
        // This is a workaround to prevent tracking the same route full path twice.
        if (to.fullPath !== this.lastRoute) {
          // Get url
          let protocol = window.location.protocol;
          if (protocol.slice(-1) !== ':') {
            protocol += ':';
          }

          const router = this.$router;
          const hashMode = router.mode === 'hash' ? '/#' : '';
          // eslint-disable-next-line no-undef
          let basePath = router.options.base;
          basePath = basePath.slice(-1) === '/' ? basePath.slice(0, -1) : basePath;

          const url = `${protocol}//${window.location.host}${basePath}${hashMode}${to.fullPath}`;

          window._paq = window._paq || [];
          window._paq.push(['setCustomUrl', url]);
          window._paq.push(['trackPageView']);
          this.lastRoute = to.fullPath;
        }
      },
    },
  };
</script>

<style lang="scss">

  * {
    box-sizing: border-box;
  }

  .site-wrapper {
    //border: 1px solid #83b4c2;
    // margin: auto;
    //box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    .content-wrapper {
      position: relative;
      max-width: 1300px;
      margin: auto;
    }
  }
</style>
