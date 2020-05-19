/* eslint-disable */
import Vue from 'vue';
import Router from 'vue-router';
import store from './store/index';
// Import glue-config.js
import { glueConfig as GLUE_CONFIG } from '../config/user-config';
import { decode } from './utils/jwt';
import { i18n } from './i18n.js'

const Datasets = () => import(/* webpackChunkName: "Datasets" */'@/components/pages/Datasets');
const DatasetDetails = () => import(/* webpackChunkName: "DatasetDetails" */'@/components/pages/DatasetDetails');
const DatasetDetailsDataset = () => import(/* webpackChunkName: "DatasetDetailsDataset" */'@/components/DatasetDetailsDataset');
const DatasetDetailsCategories = () => import(/* webpackChunkName: "DatasetDetailsCategories" */'@/components/piveau-ui-core/EDP2-datasetDetails-categories');
const DatasetDetailsSimilarDatasets = () => import(/* webpackChunkName: "DatasetDetailsSimilarDatasets" */'@/components/piveau-ui-core/EDP2-datasetDetails-similarDatasets');
// const DatasetDetailsActivityStream = () => import(/* webpackChunkName: "DatasetDetailsActivityStream" */'@/components/piveau-ui-core/EDP2-datasetDetails-activityStream');
// const DistributionDetails = () => import(/* webpackChunkName: "DistributionDetails" */'@/components/piveau-ui-core/DistributionDetails');
const Catalogues = () => import(/* webpackChunkName: "Catalogues" */'@/components/pages/Catalogues');
const Home = () => import(/* webpackChunkName: "Home" */'@/components/piveau-ui-core/Home');
const Imprint = () => import(/* webpackChunkName: "Imprint" */'@/components/pages/Imprint');
const About = () => import(/* webpackChunkName: "Imprint" */'@/components/pages/About');
const PrivacyPolicy = () => import(/* webpackChunkName: "PrivacyPolicy" */'@/components/pages/PrivacyPolicy');
const MapBasic = () => import(/* webpackChunkName: "MapBasic" */'@/components/piveau-ui-core/MapBasic');
const Auth = () => import(/* webpackChunkName: "Auth" */'@/components/piveau-ui-core/Auth');
const UploadPage = () => import(/* webpackChunkName: "UploadPage" */'@/components/piveau-ui-core/Upload/EDP2-uploadPage');
const NotFound = () => import(/* webpackChunkName: "NotFound" */'@/components/pages/NotFound');

Vue.use(Router);

const title = GLUE_CONFIG.title;

const router = new Router({
  base: GLUE_CONFIG.routerOptions.base,
  mode: GLUE_CONFIG.routerOptions.mode,
  linkActiveClass: 'active',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } 
      return { x: 0, y: 0 };
  },
  routes: [
    {
      path: '/',
      redirect: { name: 'Datasets' },
      meta: {
        title,
      },
    },
    {
      path: '/datasets',
      name: 'Datasets',
      component: Datasets,
      meta: {
        title,
      },
      // props: { infiniteScrolling: false, pagination: true },
    },
    {
      path: '/datasets/:ds_id',
      component: DatasetDetails,
      children: [
        {
          path: '',
          name: 'DatasetDetailsDataset',
          components: {
            datasetDetailsSubpages: DatasetDetailsDataset,
          },
          meta: {
            title,
          },
        },
        {
          path: 'categories',
          name: 'DatasetDetailsCategories',
          components: {
            datasetDetailsSubpages: DatasetDetailsCategories,
          },
          meta: {
            title,
          },
        },
        {
          path: 'similarDatasets',
          name: 'DatasetDetailsSimilarDatasets',
          components: {
            datasetDetailsSubpages: DatasetDetailsSimilarDatasets,
          },
          meta: {
            title,
          },
        },
        // {
        //   path: 'activityStream',
        //   name: 'DatasetDetailsActivityStream',
        //   component: {
        //     datasetDetailsSubpages: DatasetDetailsActivityStream,
        //   },
        //   meta: {
        //     title,
        //   },
        // },
        // {
        //   path: 'distributions/:dist_id',
        //   name: 'DistributionDetails',
        //   component: DistributionDetails,
        //   meta: {
        //     title,
        //   },
        // },
      ],
      meta: {
        title,
      },
    },
    {
      path: '/catalogues',
      name: 'Catalogues',
      component: Catalogues,
      meta: {
        title,
      },
      // props: { infiniteScrolling: false, pagination: true },
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        title,
      },
    },
    {
      path: '/imprint',
      name: 'Imprint',
      component: Imprint,
      title,
    },
    {
      path: '/about',
      name: 'About',
      component: About,
      title,
    },
    {
      path: '/privacypolicy',
      name: 'PrivacyPolicy',
      component: PrivacyPolicy,
      meta: {
        title,
      },
    },
    {
      path: '/maps',
      name: 'MapBasic',
      component: MapBasic,
      meta: {
        title,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: Auth,
      meta: {
        title,
        requireAuth: true,
      },
    },
    {
      path: '/upload',
      name: 'upload',
      component: UploadPage,
      props: {
        activeStep: 1,
      },
      meta: {
        title,
        requiresAuth: true,
      },
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound,
      meta: {
        title,
      },
    },
  ]
});

router.beforeEach((to, from, next) => {

  // Hash mode backward-compatibility
  // Fixes https://gitlab.fokus.fraunhofer.de/viaduct/organisation/issues/432
  if (to.redirectedFrom && to.redirectedFrom.substr(0, 3) === '/#/') {
    let path = to.redirectedFrom.substr(2);
    const base = `${GLUE_CONFIG.routerOptions.base}/`;
    if (path.startsWith(base)) {
      // Restore standard Vue behavior when navigated to '/#/base'
      // so you are redirected to '/base' instead of '/base/base'
      path = '/';
    }
    next({ path, replace: true });
  } else {
    next();
  }

  // RDF|N3|JSON-LD redirects
  if (/^\/(data\/)?datasets\/[a-z0-9-_]+(\.rdf|\.n3|\.jsonld)/.test(to.path)) {
    let locale = to.query.locale ? `&locale=${to.query.locale}` : '';
    window.location = `${window.location.protocol}//${window.location.host}${GLUE_CONFIG.routerOptions.base}/api${to.path}?useNormalizedId=true${locale}`;
  }

  if (/^\/(data\/)?api\/datasets\/[a-z0-9-_]+(\.rdf|\.n3|\.jsonld)/.test(to.path)) {
    let locale = to.query.locale ? `?locale=${to.query.locale}` : '';
    let returnPath = to.path.replace('/api', '')
      .replace(/(\.rdf|\.n3|\.jsonld)/, '')
      .replace('?useNormalizedId=true', '');
    window.location = `${window.location.protocol}//${window.location.host}${GLUE_CONFIG.routerOptions.base}${returnPath}${locale}`;
  }

  // Set language
  let lang = to.query.lang;
  if (!lang) {
    lang = from.query.lang || i18n.locale || i18n.fallbackLocale;
    to.query.lang = lang;
    i18n.locale = lang;
    next(to);
  }
  if (lang && lang !== i18n.locale) {
    i18n.locale = lang;
  }

  // Authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const auth = store.state.auth.auth;
    if (!auth.authenticated) {
      // we can show unauthorized page here for requireAuth Meta
    } else {
      // Checking the role allowed in rtpToken
      const rtpToken = decode(store.state.auth.rtptoken);
      rtpToken.realm_access.roles.forEach((role) => {
        if (role === 'provider') {
          // check or update the token on each request which needed authentication
          auth.updateToken(10).success((success) => {
            console.log('refresh token'+ success); // eslint-disable-line
            store.dispatch('auth/authLogin', auth);
            next();
          }).error((error) => {
            console.log('error on teokn '+ error); // eslint-disable-line
          });
        } else {
          // unauthorized
        }
      });
    }
  } else {
    document.title = to.meta.title;
    next();
  }
});

export default router;
