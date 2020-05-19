import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { glueConfig as GLUE_CONFIG, i18n as I18N_CONFIG } from '../config/user-config';

// Vue-i18n setup
Vue.use(VueI18n);
export const i18n = new VueI18n({
  locale: GLUE_CONFIG.locale,
  fallbackLocale: GLUE_CONFIG.fallbackLocale,
  messages: I18N_CONFIG,
  silentTranslationWarn: true,
});