<!-- Wraps all HEADER components -->

<template>
  <header>
    <b-navbar
      toggleable="lg"
      :type="type"
      :variant="variant"
      class="navbar-container mb-3 border-bottom"
      style="max-height :60px;"
    >
      <!-- Brand -->
      <div class="container-fluid content-wrapper position-relative mx-auto py-2" style="margin-bottom: initial; margin-top: inherit;">
        <b-navbar-brand>
          <slot name="brand">
            <app-link
              class="d-inline-block"
              :to="{ path: '/'}"
            >
              <div class="project-title-container">                    
                <img
                  src="@/assets/img/piveau-logo-white.svg"
                  class="piveau-logo"
                >
              </div>
            </app-link>
          </slot>
        </b-navbar-brand>

        <!-- Collapse toggle button -->
        <b-navbar-toggle target="nav-collapse" />

        <!-- Navbar items -->
        <b-collapse
          id="nav-collapse"
          is-nav
        >
          <b-navbar-nav class="left-navbar">
            <slot name="items">
              <app-link
                class="nav-link"
                :to="{ path: '/datasets'}"
              >
                {{ $t('message.header.navigation.data.datasets') }}
              </app-link>
              <app-link
                class="nav-link"
                :to="{ path: '/catalogues'}"
              >
                {{ $t('message.header.navigation.data.catalogues') }}
              </app-link>
            </slot>
          </b-navbar-nav>

          <!-- Slot for navbar content -->
          <slot name="body" />

          <!-- Right aligned nav items -->
          <b-navbar-nav
            :v-if="withLanguageSelect"
            class="right-navbar ml-auto"
          >
            <b-nav-item-dropdown
              class="language-select"
              :text="$t('message.spokenLanguage')"
              right
            >
              <b-dropdown-item
                v-for="locale in locales"
                :key="locale"
                :to="{ query: { lang: locale } }"
                exact-active-class=""
                active-class=""
                exact
              >
                {{ $t('message.spokenLanguage', locale) }}
              </b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>
  </header>
</template>

<script>
import AppLink from './AppLink';

export default {
  name: 'Top',
  components: {
    appLink: AppLink,
  },
  props: {
    type: {
      type: String,
      default: 'dark'
    },
    variant: {
      type: String,
      default: 'primary'
    },
    withLanguageSelect: {
      type: Boolean,
      default: true,
    },
    locales: {
      type: Array,
      default() {
        return ['de', 'en'];
      } 
    }
  },
};
</script>

<style lang="scss" scoped>
  @import '~@/styles/bootstrap_theme';

  .navbar-container {
    .content-wrapper {
      padding-left: 15px;
      padding-right: 15px;
    }
    .project-title-container {
      position: inline-block;
      vertical-align: top;
      text-align: right;

      .piveau-logo {
          width: 120px;
        }
        .project-name {
        text-transform: uppercase;
        font-size: 0.8em;
        font-weight: bold;
        margin-top: -10px;
      }
    }

    .navbar-nav {
      font-size: 1.1rem;
      font-weight: bold;
    }

    .right-navbar {
      .language-select {
        font-size: 1.0rem;
      }
    }
  }


  .brand-name {
    line-height: 48px;
  }
</style>
