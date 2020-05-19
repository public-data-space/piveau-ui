<!-- NAVIGATION BAR -->

<template>
  <nav
    class="navbar navbar-expand-md mb-3"
    :class="{'navbar-light': theme === 'light','navbar-dark': theme === 'dark' || theme === 'primary',
             'bg-light': theme === 'light', 'bg-dark': theme === 'dark', 'bg-primary': theme === 'primary'}"
  >
    <div class="navbar-brand">
      <app-link
        v-for="logo in logos"
        class="navbar-item"
        :to="logo.href ? logo.href : '#'"
        :target="logo.target ? logo.target : null"
        @click="logo.href ? null : $router.push({ path: `/home` })"
      >
        <img
          class="navbar-logo"
          :src="logo.src"
          :alt="logo.description"
          :style="{ width: logo.width, height: logo.height }"
        >
      </app-link>
    </div>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div
      id="navbarNav"
      class="collapse navbar-collapse justify-content-start"
    >
      <ul class="navbar-nav">
        <li
          v-if="navigation.topnav.main.home.show"
          class="nav-item"
        >
          <app-link
            class="nav-link"
            :to="navigation.topnav.main.home.href ? navigation.topnav.main.home.href : { name: `Home` }"
            :target="navigation.topnav.main.home.target"
          >
            <i
              v-if="navigation.topnav.main.icons"
              class="material-icons"
            >home</i>
            <span>{{ $t('message.navigation.navItems.home') }}</span>
          </app-link>
        </li>
        <li
          v-if="navigation.topnav.main.data.show"
          class="nav-item"
        >
          <app-link
            class="nav-link"
            :to="navigation.topnav.main.data.href ? navigation.topnav.main.data.href : {name: 'Datasets'}"
          >
            <i
              v-if="navigation.topnav.main.icons"
              class="material-icons"
            >storage</i>
            {{ $t('message.navigation.navItems.data') }}
          </app-link>
        </li>
        <li
          v-if="navigation.topnav.main.maps.show"
          class="nav-item"
        >
          <app-link
            class="nav-link"
            :to="navigation.topnav.main.maps.href ? navigation.topnav.main.maps.href : { name: `MapComp` }"
          >
            <i
              v-if="navigation.topnav.main.icons"
              class="material-icons"
            >map</i>
            {{ $t('message.navigation.navItems.map') }}
          </app-link>
        </li>
        <!-- ##### Append navigation items if configured in glue-config.js ##### -->
        <li
          v-for="navitem in navigation.topnav.main.append"
          class="nav-item appended"
        >
          <app-link
            class="nav-link"
            :to="navitem.href ? navitem.href: {name: 'Home'}"
            :target="navitem.target"
          >
            <i
              v-if="navigation.topnav.main.icons"
              class="material-icons"
            >{{ navitem.icon }}</i>
            {{ navitem.title }}
          </app-link>
        </li>

        <!-- ##### Only visible in Hamburger navigation start #####-->
        <li class="nav-item d-md-none">
          <app-link
            class="nav-link"
            :to="navigation.topnav.sub.imprint.href ? navigation.topnav.sub.imprint.href : { name: 'Imprint' }"
            :target="navigation.topnav.sub.imprint.target"
          >
            <i
              v-if="navigation.topnav.main.icons"
              class="material-icons"
            >import_contacts</i>
            {{ $t('message.navigation.navItems.imprint') }}
          </app-link>
        </li>
        <li class="nav-item d-md-none">
          <app-link
            class="nav-link"
            :to="navigation.topnav.main.privacyPolicy.href ? navigation.topnav.sub.privacyPolicy.href : { name: 'PrivacyPolicy' }"
          >
            <i
              v-if="navigation.topnav.main.icons"
              class="material-icons"
            >account_balance</i>
            {{ $t('message.navigation.navItems.privacyPolicy') }}
          </app-link>
        </li>
      </ul>
    </div>
    <!-- ##### Top-Right navigation items ##### -->
    <div class="collapse navbar-collapse justify-content-end">
      <ul class="navbar-nav">
        <li
          v-if="navigation.topnav.sub.privacyPolicy.show"
          class="nav-item small"
        >
          <app-link
            class="nav-link"
            :to="navigation.topnav.sub.privacyPolicy.href ? navigation.topnav.sub.privacyPolicy.href : { name: 'PrivacyPolicy' }"
          >
            {{ $t('message.navigation.navItems.privacyPolicy') }}
          </app-link>
        </li>
        <li
          v-if="navigation.topnav.sub.imprint.show"
          class="nav-item small"
        >
          <app-link
            class="nav-link"
            :to="navigation.topnav.sub.imprint.href ? navigation.topnav.sub.imprint.href : { name: 'Imprint' }"
          >
            {{ $t('message.navigation.navItems.imprint') }}
          </app-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
  import { glueConfig as GLUE_CONFIG } from '@/../config/user-configs';
  import AppLink from './AppLink';

  export default {
    name: 'Topnav',
    components: {
      appLink: AppLink,
    },
    data() {
      return {
        logos: GLUE_CONFIG.images.headerLogos,
        menuIsActive: false,
        navigation: GLUE_CONFIG.navigation,
        theme: GLUE_CONFIG.themes.header,
      };
    },
    computed: {
      /**
       * @description Returns the name of the current route.
       * @return {String}
       */
      currentRoute() {
        return this.$store.getters.getCurrentRoute;
      },
    },
    methods: {
    },
  };
</script>

<style lang="scss" scoped>
  @import '~@/styles/bootstrap_theme';

  .navbar {
    i {
      vertical-align: middle;
      margin: 0 0 .1em 0;
    }
    img {
      &.navbar-logo {
        height: 2.5rem;
        width: auto;
      }
    }
  }
</style>
