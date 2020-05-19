<!-- Wraps all FOOTER components -->

<template>
  <footer>
    <nav class="navbar-light bg-light border-top pt-3 pb-3" style="background-color : #00bc8c !important">
      <div class="content-wrapper navbar navbar-expand-sm">
        <slot>
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <slot name="logo">
                <app-link
                  class="footer-link"
                  to="https://www.piveau.de/"
                >
                  <img
                    src="@/assets/img/piveau-logo-black.svg"
                    alt="Piveau icon"
                  >
                </app-link>
              </slot>
            </li>
            <li class="nav-item">
              <app-link
                class="footer-link"
                target="_blank"
                to="https://www.fokus.fraunhofer.de/"
              >
                <img
                  src="@/assets/img/fokus-logo.svg"
                  alt="Fraunhofer FOKUS icon"
                >
              </app-link>
            </li>
            <li class="nav-item">
                <app-link
                  class="footer-link"
                  target="_blank"
                  to="https://www.piveau.de/"
                >
                  <img
                    src="@/assets/img/piveau-logo-black.svg"
                    alt="Piveau icon"
                  >
                </app-link>
            </li>
            <li class="nav-item ">
             <a href="https://www.fokus.fraunhofer.de/imprint" class="footer-link active" style="color: white; text-decoration: none;"> Impressum </a>
            </li>
            <li class="nav-item">
             <a href="https://www.fokus.fraunhofer.de/data_protection" class="footer-link active" style="color: white; text-decoration: none;"> Data Protection </a>

            </li>
          </ul>
        </slot>
      </div>
    </nav>
  </footer>
</template>

<script>
import { glueConfig as GLUE_CONFIG } from '@/../config/user-config';
import AppLink from './AppLink';

export default {
  name: 'Bottom',
  components: {
    AppLink,
  },
  data() {
    return {
      footerLogos: GLUE_CONFIG.images.footerLogos,
    };
  }
};
</script>

<style lang="scss" scoped>

.navbar-nav {
  a {
    display: inline-block;
    margin-right: 1.5rem;
  }
  img {
    height: 40px;
  }
}

.nav-item {
  margin: auto;
}

.footer-link {
  padding: 0;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  color: #fff;
  &:hover {
        color: #343a40 ;
      }
  &.active {
        color: #343a40;
      }
  
}
</style>
