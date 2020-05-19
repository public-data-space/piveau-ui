/*
The header component.

Customize the default header component or create your own here.
*/

<template>
  <div class="navbar-wrapper" >
    <top
      type="light"
      variant="light"
    >
      <!-- Use default footer but with different logo -->
      <template #brand>
        <app-link
          class="footer-link"
          :to="{ path: '/'}"
        >
          <div style="display:flex;">
            <img
              class="navbar-logo"
              src="@/assets/img/ids-white.png"
              alt="International Data Spaces"
              style="margin-right:10px;"
            >
            <div class="boxhead">
                    <h2>International</h2>
                    <h2><strong>Data Spaces</strong></h2></div>
          </div>
        </app-link>
      </template>
      <template #items>
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
        <!--app-link
          class="nav-link"
          :to="{ path: '/about'}"
        >
          {{ $t('message.header.navigation.data.about') }}
        </app-link-->
      </template>


    </top>
  </div>
</template>

<script>
import Top from '@/components/piveau-ui-core/Top';
import AppLink from '@/components/piveau-ui-core/AppLink';

export default {
  name: 'TheHeader',
  components: {
    Top,
    AppLink
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/bootstrap_theme';

.navbar-wrapper {
  .navbar-logo {
    height: 50px;
    width: auto;
  }

  // Override default header style
  /deep/ .navbar-container {

    background-color: #00bc8c  !important;

    // div.content-wrapper {
    //   padding-left: 0;
    //   padding-right: 0;
    //   margin-left: 0!important;
    //   margin-right: 0!important;
    //   max-width: 100%;
    // }

    .nav-link {
      padding: 0;
      margin-left: 0.5rem;
      margin-right: 0.5rem;
      color: #fff;

      &:hover {
        color: $gray-800;
      }


      &.active {
        color: #3e5252;
      }
    }
    h2 {

      font-size: 1.2rem;
      color: white;
      margin: auto;

    }
    a {text-decoration:none;
    }
    h2:link, h2:visited, h2:active, h2:hover {text-decoration:  none !important;}

    .footer-link {
      height: 26px;
    }
    .navbar-nav {
      position: relative;
      font-size: 0.9375rem;
      font-weight: bold;
    }
  }
}

</style>
