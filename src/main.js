/* eslint-disable no-new */
import "core-js/stable";
import "regenerator-runtime/runtime";
// Import vuex-router-sync
import { sync } from 'vuex-router-sync';
// Bootstrap-vue
import './styles/styles.sass'
// OpenStreetMaps popup styles
import 'leaflet/dist/leaflet.css';
import {
  BootstrapVue,
  IconsPlugin,
} from 'bootstrap-vue'
// Import vue-progressbar
import VueProgressBar from 'vue-progressbar';
// Import vue-i18n
import { i18n } from './i18n.js'
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
// Import vue-meta
import Meta from 'vue-meta';
// Import vue-inject
import injector from 'vue-inject';
// Import vee-validate
import VeeValidate from 'vee-validate';
// Import Font Awesome Icons Library for vue
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faGoogle,
  faGooglePlus,
  faGooglePlusG,
  faFacebook,
  faFacebookF,
  faInstagram,
  faTwitter,
  faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons';
import {
  faComment,
  faExternalLinkAlt,
  faPlus,
  faMinus,
  faArrowDown,
  faArrowUp,
  faInfoCircle,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// Import main user configurations (glueConfig) and i18n configurations
import { glueConfig as GLUE_CONFIG } from '../config/user-config';
// Import vue-router
import router from './router';
// Import vuex store
import store from './store/index';
// Import the APP component
import App from './App';
// Import dateFilters
import dateFilters from './filters/dateFilters';
// Import runtimeconfig
import RuntimeConfiguration from './runtimeconfig';
// Import services
import services from './services/services';

// Configured language
const LOCALE = GLUE_CONFIG.locale;

// Set locale for dateFilters
dateFilters.setLocale(LOCALE);

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

// Runtimeconfig setup
Vue.use(RuntimeConfiguration, { baseConfig: GLUE_CONFIG, debug: true });

// Vue-meta setup
Vue.use(Meta, {
  refreshOnceOnNavigation: true,
  debounceWait: 100,
});

// Bootstrap requirements to use js-features of bs-components
// require('popper.js');
// require('bootstrap');
// require('./styles/styles.sass');
// $(() => {
//   $('[data-toggle="popover"]').popover({ container: 'body' });
// });

// Vue-progressbar setup
const progressBarOptions = {
  thickness: '5px',
  autoRevert: false,
  transition: {
    speed: '1.0s',
    opacity: '0.5s',
    termination: 1000,
  },
};
Vue.use(VueProgressBar, progressBarOptions);

// Vee-validate (form validation) setup
Vue.use(VeeValidate);

// Vue-inject setup
Vue.use(injector, { components: true });

// Services setup
services(Vue.prototype.$env);

// Sync store and router
sync(store, router);

// Add Font Awesome Icons
library.add(faGoogle, faGooglePlus, faGooglePlusG, faFacebook, faFacebookF, faInstagram, faTwitter, faLinkedinIn, faComment, faExternalLinkAlt, faPlus, faMinus, faArrowDown, faArrowUp, faInfoCircle, faExclamationTriangle);
Vue.component('font-awesome-icon', FontAwesomeIcon);


Vue.config.productionTip = false;
new Vue({
  render: h => h(App),
  router,
  store,
  i18n,
}).$mount('#app');
