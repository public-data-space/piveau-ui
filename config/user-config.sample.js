import datasetService from '../src/piveau-ui-adapter-vhub/datasets';
import catalogueService from '../src/piveau-ui-adapter-vhub/catalogues';
import distributionService from '../src/piveau-ui-adapter-vhub/distributions';
import datastoreService from '../src/piveau-ui-adapter-vhub/datastore';
import gazetteerService from '../src/piveau-ui-adapter-vhub/gazetteer';
import uploadService from '../src/services/uploads';
import authService from '../src/auth/authService';
import i18n from './i18n/i18n.json';

const glueConfig = {
  title: 'IDS Open Data Broker',
  description: 'IDS Open Data Broker',
  keywords: 'International Data Spaces, IDS, Industrial Data Space, Open DataIn dem ',
  api: {
    baseUrl: '',
    similarityBaseUrl: '',
    gazetteerBaseUrl: null,
    uploadBaseUrl: '',
    matomoUrl: '',
    authToken: '',
  },
  useAuthService: false,
  keycloak: {
    enableLogin: false,
    realm: '',
    url: '',
    'ssl-required': 'external',
    clientId: '',
    'public-client': true,
    'verify-token-audience': true,
    'use-resource-role-mappings': true,
    'confidential-port': 0,
  },
  rtp: {
    grand_type: 'urn:ietf:params:oauth:grant-type:uma-ticket',
    audience: 'piveau-hub',
  },
  locale: 'de',
  fallbackLocale: 'en',
  services: {
    catalogueService,
    datasetService,
    distributionService,
    datastoreService,
    gazetteerService,
    uploadService,
    authService,
  },
  themes: {
    header: 'dark',
  },
  routerOptions: {
    base: '/browse/',
    mode: 'history',
  },
  navigation: {
    top: {
      main: {
        home: {
          // href: 'https://link-to-external-url.com' (optional)
          // target: ['_self' | '_blank'] (optional)
          show: true,
        },
        data: {
          show: true,
        },
        maps: {
          show: false,
        },
        about: {
          show: false,
        },
        append: [
          {
            href: 'https://www.fokus.fraunhofer.de/datenschutz',
            target: '_self',
            title: 'Privacy Policy',
          },
          {
            href: 'https://www.fokus.fraunhofer.de/9663f8cb2d267d4b',
            target: '_self',
            title: 'Imprint',
          },
        ],
        icons: false,
      },
      sub: {
        privacyPolicy: {
          show: false,
          href: 'https://www.fokus.fraunhofer.de/datenschutz',
          target: '_self',
        },
        imprint: {
          show: false,
          href: 'https://www.fokus.fraunhofer.de/9663f8cb2d267d4b',
          target: '_self',
        },
      },
    },
    bottom: {}
  },
  images: {
    top: [
      {
        src: '',
        // href: 'https://my-url.de'(optional)
        // target: ['_self' | '_blank'] (optional)
        description: '',
        height: '60px',
        width: 'auto',
      },
    ],
    bottom: [],
  },
};

export { glueConfig, i18n };
