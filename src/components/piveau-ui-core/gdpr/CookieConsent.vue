// Displays a banner asking the user for consent to use cookies and trackers.
// Helps with complying privacy laws.

<template>
  <vue-cookie-accept-decline
    :ref="'cookie-accept-decline-banner'"
    class="cookie-consent"
    :class="`bg-${variant}`"
    no-cookies-until-consent
    :element-id="'cookie-accept-decline-banner'"
    :debug="false"
    :position="'top'"
    :type="'bar'"
    :disable-decline="false"
    :transition-name="'slideFromTop'"
    :show-postpone-button="true"
    @status="cookieStatus"
    @clicked-accept="cookieClickedAccept"
    @clicked-decline="cookieClickedDecline"
    @removed-cookie="cookieRemoved"
  >
    <!-- Optional -->
    <template #postponeContent>
      <span class="text-white">
        &times;
      </span>
    </template>

    <!-- Optional -->
    <template #message>
      <span class="text-white font-weight-bold">
        <!-- TODO improve and translate me -->
        We use cookies on this site to enhance your user experience
      </span>
    </template>

    <!-- Optional -->
    <template #declineContent>
      <span class="text-dark">
        No, I want to find out more
      </span>
    </template>

    <!-- Optional -->
    <template #acceptContent>
      <span class="text-dark">
        Yes, I agree
      </span>
    </template>
  </vue-cookie-accept-decline>
</template>

<script>
  import VueCookieAcceptDecline from './vue-cookie-accept-decline';

  export default {
    name: 'CookieConsent',
    components: {
      VueCookieAcceptDecline,
    },
    props: {
      variant: {
        type: String,
        default: 'primary',
      },
      declineJumpToHref: {
        type: String,
        default: '',
      },
      matomoUrl: {
        type: String,
        required: true,
      },
    },
    created() {
      /* eslint-disable no-underscore-dangle */
      window._paq = window._paq || [];
    },
    methods: {
      cookieClickedAccept() {
        // Authorize Matomo tracker
        window._paq.push(['rememberConsentGiven']);
        this.initTracker();
      },
      cookieClickedDecline() {
        window._paq.push(['forgetConsentGiven']);
        if (this.declineJumpToHref) {
          window.open(this.declineJumpToHref, '_blank');
        }
      },
      cookieStatus(status) {
        if (status === 'accept') {
          this.initTracker();
        }
      },
      cookieRemoved() {
        window._paq.push(['forgetConsentGiven']);
      },
      initTracker() {
        // Get Matomo
        window._paq = window._paq || [];
        this.tracker = window._paq;

        window._paq.push(['requireConsent']);

        (() => {
          const u = this.matomoUrl.slice(-1) === '/' ? this.matomoUrl : `${this.matomoUrl}/`;
          window._paq.push(['setTrackerUrl', `${u}matomo.php`]);
          window._paq.push(['setSiteId', '1']);
          const d = document;
          const g = d.createElement('script');
          const s = d.getElementsByTagName('script')[0];
          g.type = 'text/javascript';
          g.async = true;
          g.defer = true;
          g.src = `${u}matomo.js`;
          s.parentNode.insertBefore(g, s);
        })();
      },
    },
  };
</script>

<style scoped lang="scss">
@import '~@/styles/bootstrap_theme';

$bg-color: $primary;
$bg-color-light: lighten($bg-color, 4%);

.cookie-consent {
  position: sticky;
  border-top: 1px solid $bg-color-light;
  border-bottom: 1px solid $bg-color-light;

  /deep/ .cookie__bar__buttons__button {
    &--decline, &--accept {
      background: $light !important;
      
      &:hover {
        background: darken($light, 8%) !important;
      }
    }
  }
}
</style>
