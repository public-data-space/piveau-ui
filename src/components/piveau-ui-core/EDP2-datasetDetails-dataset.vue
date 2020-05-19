<template>
  <div class="mb-5">
    <div v-if="!loadingDatasetDetails">
      <span
        property="dc:issued"
        :content="getReleaseDate"
      />
      <span
        property="dc:modified"
        :content="getModificationDate"
      />
      <!-- TEXT -->
      <div class="mt-4">
        <div class="row">
          <div
            class="col-10 offset-1"
            property="dc:description"
          >
            <p>{{ getTranslationFor(getDescription, $i18n.locale, getLanguages) | stripHtml }}</p>
          </div>
        </div>
      </div>
      <!-- INFO BANNERS -->
      <div class="mt-3">
        <div class="row">
          <div class="col-12">
            <!-- INCORRECT DATE BANNER -->
            <div
              v-if="!disableIncorrectDateAlert && dateIncorrect"
              class="p-0 py-3 text-center text-sm-left alert alert-secondary alert-dismissible fade show"
              role="alert"
            >
              <div class="row">
                <div class="col-1 m-auto text-center">
                  <b-icon-alert-circle-fill
                    scale="1.5"
                    class="material-icons"
                  >
                    info
                  </b-icon-alert-circle-fill>
                </div>
                <div class="col-10">
                  <p class="mb-0">
                    This dataset's last updated date is incorrect or incomplete, please contact the data provider for further inquiries.
                  </p>
                </div>
                <div class="col-1">
                  <button
                    class="close pt-0"
                    type="button"
                    data-dismiss="alert"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              </div>
            </div>
            <!-- MACHINE TRANSLATED BANNER -->
            <div
              v-if="!disableTranslationAlert && machineTranslated"
              class="p-0 py-3 text-center text-sm-left alert alert-secondary alert-dismissible fade show"
              role="alert"
            >
              <div class="row">
                <div class="col-1 m-auto text-center">
                  <b-icon-alert-circle-fill
                    scale="1.5"
                    class="material-icons"
                  >
                    info
                  </b-icon-alert-circle-fill>
                </div>
                <div class="col-10">
                  <p class="mb-0">
                    {{ $t('message.datasetDetails.translation.message') }}
                  </p>
                  <div v-if="showOriginalLanguage(getOriginalLanguage)">
                    <p class="mb-0">
                      {{ $t('message.datasetDetails.translation.original') }}: <strong>{{ getOriginalLanguage }}</strong>
                    </p>
                    <app-link :to="getDatasetOriginalLanguage(getOriginalLanguage)">
                      <button
                        class="alert-link font-weight-light btn btn-link btn-sm p-0"
                        @click="setDatasetOriginalLanguage(getOriginalLanguage)"
                      >
                        {{ $t('message.datasetDetails.translation.link') }}
                      </button>
                    </app-link>
                  </div>
                </div>
                <div class="col-1">
                  <button
                    class="close pt-0"
                    type="button"
                    data-dismiss="alert"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              </div>
            </div>
            <!-- TRANSLATION NOT AVAILABLE BANNER -->
            <div
              v-if="!disableTranslationAlert && translationNotAvailable"
              class="p-0 py-3 text-center text-sm-left alert alert-secondary alert-dismissible fade show"
              role="alert"
            >
              <div class="row">
                <div class="col-1 m-auto text-center">
                  <b-icon-alert-circle-fill
                    scale="1.5"
                    class="material-icons"
                  >
                    info
                  </b-icon-alert-circle-fill>
                </div>
                <div class="col-10">
                  <p class="mb-0">
                    {{ $t('message.datasetDetails.translation.noTranslation') }}
                  </p>
                </div>
                <div class="col-1">
                  <button
                    class="close pt-0"
                    type="button"
                    data-dismiss="alert"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              </div>
            </div>
            <!-- TRANSLATION UPDATE PROCESSING BANNER -->
            <div
              v-if="!disableTranslationAlert && translationUpdateProcessing"
              class="p-0 py-3 text-center text-sm-left alert alert-secondary alert-dismissible fade show"
              role="alert"
            >
              <div class="row">
                <div class="col-1 m-auto text-center">
                  <b-icon-alert-circle-fill
                    scale="1.5"
                    class="material-icons"
                  >
                    info
                  </b-icon-alert-circle-fill>
                </div>
                <div class="col-10">
                  <p class="mb-0">
                    {{ $t('message.datasetDetails.translation.update') }}
                  </p>
                </div>
                <div class="col-1">
                  <button
                    class="close pt-0"
                    type="button"
                    data-dismiss="alert"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- DISTRIBUTIONS -->
      <div class="mt-1">
        <div class="row">
          <div class="col-10 offset-1">
            <h3>{{ $t('message.metadata.distributions') }} ({{ getDistributions ? getDistributions.length : 0 }})</h3>
          </div>
          <ul class="list list-unstyled col-12">
            <hr>
            <div
              v-for="distribution in getDistributions"
              :key="distribution.id"
            >
              <li class="row">
                <span class="d-inline-block col-md-1 col-2 pr-md-1 pr-0 m-md-0 m-auto">
                  <div
                    class="circle float-md-right text-center text-white"
                    :type="getDistributionFormat(distribution)"
                    :data-toggle="distributionFormatTruncated(distribution) ? 'tooltip' : false"
                    :data-placement="distributionFormatTruncated(distribution) ? 'top' : false"
                    :title="distributionFormatTruncated(distribution) ? getDistributionFormat(distribution) : false"
                  >
                    <span>{{ truncate(getDistributionFormat(distribution), 4, true) }}</span>
                  </div>
                </span>
                <span class="col-10">
                  <span class="row">
                    <span class="d-inline-block col-md-7 col-12">
                      <h6 class="m-0">{{ getDistributionTitle(distribution) }}</h6>
                      <span class="mt-2 d-block text-muted text-truncate">
                        <small>
                          {{ getDistributionDescription(distribution) }}
                        </small>
                      </span>
                      <small
                        v-if="showLicence(distribution)"
                        class="mt-2 d-block"
                      >
                        <span class="font-weight-bold">
                          <!-- TODO: Replace Licence text by icon -->
                          {{ $t('message.metadata.license') }}:
                        </span>
                        <app-link
                          :to="distribution.licence.resource"
                          target="_blank"
                          @click="$emit('trackLink', distribution.licence.resource, 'link')"
                        >
                          {{ distribution.licence.title }}
                        </app-link>
                        <app-link
                          :to="distribution.licence.resource"
                          target="_blank"
                          @click="$emit('trackLink', distribution.licence.resource, 'link')"
                        >
                          <b-icon-alert-circle-fill
                            v-b-tooltip.hover.focus
                            :title="distribution.licence.description"
                            class="material-icons small-icon align-bottom text-dark"
                          >info</b-icon-alert-circle-fill>
                        </app-link>
                        <app-link
                          v-if="showLicensingAssistant(distribution)"
                          :to="distribution.licence.la_url"
                          target="_blank"
                          @click="$emit('trackLink', distribution.licence.la_url, 'link')"
                        >
                          {{ $t('message.distributionLicense.licensingAssistant') }}
                        </app-link>
                        <app-link
                          v-if="showLicensingAssistant(distribution)"
                          :to="distribution.licence.la_url"
                          target="_blank"
                          @click="$emit('trackLink', distribution.licence.la_url, 'link')"
                        >
                          <b-icon-box-arrow-up-right>open_in_new</b-icon-box-arrow-up-right>
                        </app-link>
                      </small>
                      <small
                        v-else
                        class="text-muted"
                      >
                        {{ $t('message.distributionLicense.notProvided') }}
                      </small>
                    </span>
                    <span class="col-md-5 col-12 mt-2 text-md-right text-left">
                      <span class="d-inline-block">
                        <small class="pr-1">{{ filterDateFormatEU(distribution.releaseDate) }}</small>
                      </span>
                      <b-dropdown
                        v-if="!disableOptionsDropdown && showOptionsDropdown(distribution)"
                        class="options d-inline-block pr-1"
                        size="sm"
                        variant="secondary"
                        :text="$t('message.datasetDetails.options')"
                      >
                        <b-dropdown-item-button>
                          <app-link
                            v-if="showVisualisationLink(distribution)"
                            class="dropdown-item px-3 text-right"
                            :path="getVisualisationLink(distribution.accessUrl)"
                            target="_blank"
                            @click="$emit('trackLink', getVisualisationLink(distribution.accessUrl), 'link')"
                          >
                            <small class="px-2">{{ $t('message.datasetDetails.visualisation') }}</small>
                            <b-icon-bar-chart-fill>bar_chart</b-icon-bar-chart-fill>
                          </app-link>
                        </b-dropdown-item-button>
                        <b-dropdown-item-button>
                          <app-link
                            v-if="showGeoLink(distribution)"
                            class="dropdown-item px-3 text-right"
                            :path="getGeoLink(distribution.format.title, distribution.id)"
                            target="_blank"
                            @click="$emit('trackLink', getGeoLink(distribution.format.title, distribution.id), 'link')"
                          >
                            <small class="px-2">{{ $t('message.datasetDetails.geoVisualisation') }}</small>
                            <i class="material-icons float-right align-bottom">public</i>
                          </app-link>
                        </b-dropdown-item-button>
                      </b-dropdown>
                      <b-dropdown
                        v-if="showDownloadDropdown(distribution)"
                        class="download dropdown d-inline-block"
                        right
                        text="Download"
                        size="sm"
                        variant="primary"
                      >
                        <b-dropdown-item-button
                          v-if="showAccessUrl(distribution)"
                        >
                          <app-link
                            class="text-dark text-decoration-none"
                            :to="distribution.accessUrl"
                            target="_blank"
                            rel="dcat:distribution noopener"
                            matomo-track-download
                            @after-click="trackGoto"
                          >
                            <small
                              class="px-2"
                              property="dcat:mediaType"
                              :content="getDistributionFormat(distribution)"
                            >{{ $t('message.datasetDetails.openResource') }}</small>
                            <b-icon-box-arrow-up-right font-scale="1.5">open_in_new</b-icon-box-arrow-up-right>
                          </app-link>
                          <b-icon-document-text
                            font-scale="1.5"
                            class="copy-text"
                            @click="setClipboard(distribution.accessUrl)"
                          >
                            file_copy
                          </b-icon-document-text>
                        </b-dropdown-item-button>
                        <b-dropdown-divider v-if="showDownloadUrls(distribution)" />
                        <div v-if="showDownloadUrls(distribution)">
                          <b-dropdown-form
                            v-for="downloadURL in distribution.downloadUrls"
                            :key="downloadURL"
                            class="resource-dropdown-form"
                          >
                            <b-form-group>
                              <div class="d-flex justify-content-between">
                                <b-form-input
                                  disabled
                                  class="d-inline-block mr-2 py-0 w-100 small border border-secondary"
                                  size="sm"
                                  type="text"
                                  width="200px"
                                  :value="`${downloadURL}`"
                                />
                                <app-link
                                  class="d-inline-block mr-2 text-dark text-decoration-none"
                                  :to="downloadURL"
                                  target="_blank"
                                  matomo-track-download
                                  @after-click="trackGoto"
                                >
                                  <b-icon-box-arrow-up-right
                                    scale="1.5"
                                  >open_in_new</b-icon-box-arrow-up-right>
                                </app-link>
                                <span
                                  class="d-inline-block copy-text "
                                  @click="setClipboard(downloadURL)"
                                >
                                  <b-icon-document-text
                                    scale="1.5"
                                    class="material-icons"
                                  >file_copy
                                  </b-icon-document-text>
                                </span>
                              </div>
                            </b-form-group>
                          </b-dropdown-form>
                        </div>
                      </b-dropdown>
                    </span>
                  </span>
                </span>
              </li>
              <hr>
            </div>
          </ul>
        </div>
      </div>
      <!-- KEYWORDS -->
      <div
        v-if="showKeywords(getKeywords)"
        class="mt-2"
      >
        <div class="row">
          <div class="col-10 offset-1">
            <div class="row">
              <span
                v-for="(keyword, i) in getKeywords"
                v-if="showKeyword(keyword)"
                :key="i"
                class="col-4 col-sm-3 col-md-2 mt-md-0 mt-3 mb-2 pr-0"
                property="dcat:keyword"
                :content="keyword.title"
              >
                <app-link :to="getKeywordLink(keyword)">
                  <small
                    class="d-inline-block w-100 p-1 ml-1 rounded-pill text-center text-white bg-primary"
                    :data-toggle="keywordTruncated(keyword) ? 'tooltip' : false"
                    :data-placement="keywordTruncated(keyword) ? 'top' : false"
                    :title="keywordTruncated(keyword) ? keyword.title : false"
                  >
                    {{ truncate(keyword.title, maxKeywordLength, false) }}
                  </small>
                </app-link>
              </span>
            </div>
          </div>
        </div>
      </div>
      <!-- MAP -->
      <div
        v-if="showSpatial(getSpatial)"
        class="mt-5"
      >
        <div class="row">
          <div
            class="col-1 my-auto pr-0 text-right"
            @click="toggleMap()"
          >
            <span
              v-if="mapVisible"
              class="arrow text-primary"
            >
              <b-icon-chevron-up
                scale="1.5"
                class="material-icons"
              >keyboard_arrow_up</b-icon-chevron-up>
            </span>
            <span
              v-else
              class="arrow text-primary"
            >
              <b-icon-chevron-down
                scale="1.5"
                class="material-icons"
              >keyboard_arrow_down</b-icon-chevron-down>
            </span>
          </div>
          <div class="col-10">
            <h3
              class="heading"
              @click="toggleMap()"
            >
              {{ $t('message.datasetDetails.geoInfo') }}
            </h3>
          </div>
          <div class="col-10 offset-1">
            <div
              id="collapse-geo-info"
              ref="geocollapse"
              class="collapse show"
            >
              <div class="map">
                <map-basic
                  width="100%"
                  height="400px"
                  :spatial-type="getSpatial.type"
                  :spatial-coordinates="getSpatial.coordinates"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- INFO -->
      <div class="mt-5">
        <div class="row">
          <div class="col-12">
            <div class="row">
              <div
                class="col-1 my-auto pr-0 text-right"
                @click="toggleInfo()"
              >
                <span
                  v-if="!infoVisible"
                  class="arrow text-primary"
                >
                  <b-icon-chevron-down
                    scale="1.5"
                    class="material-icons"
                  >keyboard_arrow_down</b-icon-chevron-down>
                </span>
                <span
                  v-else
                  class="arrow text-primary"
                >
                  <b-icon-chevron-up
                    scale="1.5"
                    class="material-icons"
                  >keyboard_arrow_up</b-icon-chevron-up>
                </span>
              </div>
              <div class="col-10 py-2">
                <h3
                  class="heading"
                  @click="toggleInfo()"
                >
                  {{ $t('message.datasetDetails.additionalInfo') }}
                </h3>
              </div>
              <div
                v-if="infoVisible"
                class="col-10 offset-1"
              >
                <table class="table table-borderless table-responsive pl-3 bg-light">
                  <tr v-if="isArray(getLandingPages) && getLandingPages.length > 0">
                    <td class="w-25 font-weight-bold">
                      {{ $t('message.metadata.landingPage') }}
                    </td>
                    <td>
                      <div
                        v-for="(landingPage, i) of getLandingPages"
                        :key="i"
                      >
                        <app-link :to="landingPage || ''">
                          {{ landingPage }}
                        </app-link>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="isArray(getSources) && getSources.length > 0">
                    <td class="w-25 font-weight-bold">
                      {{ $t('message.metadata.sources') }}
                    </td>
                    <td>
                      <div
                        v-for="(source, i) of getSources"
                        :key="i"
                      >
                        <app-link
                          v-if="!isNil(source)"
                          :to="source"
                        >
                          {{ source }}
                        </app-link>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="!isNil(filterDateFormatEU(getReleaseDate))">
                    <td class="w-25 font-weight-bold">
                      {{ $t('message.metadata.created') }}
                    </td>
                    <td>{{ filterDateFormatEU(getReleaseDate) }}</td>
                  </tr>
                  <tr v-if="!isNil(filterDateFormatEU(getModificationDate))">
                    <td class="w-25 font-weight-bold">
                      {{ $t('message.metadata.updated') }}
                    </td>
                    <td>{{ filterDateFormatEU(getModificationDate) }}</td>
                  </tr>
                  <tr v-if="showSpatial(getSpatial)">
                    <td class="w-25 font-weight-bold">
                      {{ $t('message.metadata.spatial') }}
                    </td>
                    <td>
                      <div>{{ $t('message.metadata.coordinates') }}: {{ getSpatial ? getSpatial.coordinates : '' }}</div>
                      <div v-if="has(getSpatial, 'type') && !isNil(getSpatial.type)">
                        {{ $t('message.metadata.type') }}: {{ getSpatial ? getSpatial.type : '' }}
                      </div>
                    </td>
                  </tr>
                  <tr
                    v-if="isObject(getPublisher) &&
                      ( (has(getPublisher, 'name') && !isNil(getPublisher.name)) ||
                      (has(getPublisher, 'email') && !isNil(getPublisher.email)) ||
                      (has(getPublisher, 'resource')) && !isNil(getPublisher.resource) )"
                  >
                    <td class="w-25 font-weight-bold">
                      {{ $t('message.metadata.publisher') }}
                    </td>
                    <td>
                      <div v-if="has(getPublisher, 'name') && !isNil(getPublisher.name)">
                        {{ $t('message.metadata.name') }}: {{ getPublisher.name }}
                      </div>
                      <div v-if="has(getPublisher, 'email') && !isNil(getPublisher.email)">
                        {{ $t('message.metadata.email') }}: {{ getPublisher.email }}
                      </div>
                      <div v-if="has(getPublisher, 'resource') && !isNil(getPublisher.resource)">
                        {{ $t('message.metadata.resource') }}:
                        <app-link :to="getPublisher.resource">
                          {{ getPublisher.resource }}
                        </app-link>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="isArray(getContactPoints) && getContactPoints.length > 0">
                    <td class="w-25 font-weight-bold">
                      {{ $t('message.metadata.contactPoints') }}
                    </td>
                    <td>
                      <div
                        v-for="(contactPoint, i) in getContactPoints"
                        :key="i"
                      >
                        <div v-if="has(contactPoint, 'name') && !isNil(contactPoint.name)">
                          {{ $t('message.metadata.name') }}: {{ contactPoint.name }}
                        </div>
                        <div v-if="has(contactPoint, 'email') && !isNil(contactPoint.email)">
                          {{ $t($t('message.metadata.email')) }}:
                          <app-link :to="`mailto:${contactPoint.email}`">
                            {{ contactPoint.email }}
                          </app-link>
                        </div>
                        <div v-if="has(contactPoint, 'resource') && !isNil(contactPoint.resource)">
                          {{ $t('message.metadata.resource') }}:
                          <app-link :to="contactPoint.resource">
                            {{ contactPoint.resource }}
                          </app-link>
                        </div>
                        <br>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="isArray(getConformsTo) && getConformsTo.length > 0">
                    <td class="w-25 font-weight-bold">
                      {{ $t('message.metadata.conformsTo') }}
                    </td>
                    <td>
                      <div
                        v-for="(conformTo, i) in getConformsTo"
                        :key="i"
                      >
                        <div v-if="has(conformTo, 'title') && !isNil(conformTo.title)">
                          {{ $t('message.metadata.title') }}: {{ conformTo.title }}
                        </div>
                        <div v-if="has(conformTo, 'resource') && !isNil(conformTo.resource)">
                          {{ $t('message.metadata.resource') }}:
                          <app-link :to="conformTo.resource">
                            {{ conformTo.resource }}
                          </app-link>
                        </div>
                        <br>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="isArray(getProvenances) && getProvenances.length > 0">
                    <td class="w-25 font-weight-bold">
                      {{ $t('message.metadata.provenances') }}
                    </td>
                    <td>
                      <div
                        v-for="(provenance, i) in getProvenances"
                        :key="i"
                      >
                        <div v-if="has(provenance, 'label') && !isNil(provenance.label)">
                          {{ $t('message.metadata.label') }}: {{ provenance.label }}
                        </div>
                        <div v-if="has(provenance, 'resource') && !isNil(provenance.resource)">
                          {{ $t('message.metadata.resource') }}:
                          <app-link :to="provenance.resource">
                            {{ provenance.resource }}
                          </app-link>
                        </div>
                        <br>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="isArray(getRelatedResources) && getRelatedResources.length > 0">
                    <td class="w-25 font-weight-bold">
                      {{ $t('message.metadata.relatedResources') }}
                    </td>
                    <td>
                      <div
                        v-for="(resource, i) of getRelatedResources"
                        v-if="!isNil(resource)"
                        :key="i"
                      >
                        <app-link :to="resource">
                          {{ resource }}
                        </app-link>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="isArray(getIdentifiers) && getIdentifiers.length > 0">
                    <td class="w-25 font-weight-bold">
                      {{ $t('message.metadata.identifiers') }}
                    </td>
                    <td>
                      <div
                        v-for="(identifier, i) of getIdentifiers"
                        v-if="!isNil(identifier)"
                        :key="i"
                      >
                        {{ identifier }}
                      </div>
                    </td>
                  </tr>
                  <tr v-if="isArray(getOtherIdentifiers) && getOtherIdentifiers.length > 0">
                    <td class="w-25 font-weight-bold">
                      {{ $t('message.metadata.otherIdentifiers') }}
                    </td>
                    <td>
                      <div
                        v-for="(identifier, i) of getOtherIdentifiers"
                        v-if="!isNil(identifier)"
                        :key="i"
                      >
                        {{ identifier }}
                      </div>
                    </td>
                  </tr>
                  <tr v-if="isArray(getDocumentations) && getDocumentations.length > 0">
                    <td class="w-25 font-weight-bold">
                      {{ $t('message.metadata.documentations') }}
                    </td>
                    <td>
                      <div
                        v-for="(documentation, i) of getDocumentations"
                        v-if="!isNil(documentation)"
                        :key="i"
                      >
                        <app-link :to="documentation">
                          {{ documentation }}
                        </app-link>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="has(getFrequency, 'title') && !isNil(getFrequency.title)">
                    <td class="w-25 font-weight-bold">
                      {{ $t('message.metadata.frequency') }}
                    </td>
                    <td>
                      <div>{{ getFrequency.title }}</div>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import Actions and Getters from Store Module
  import { mapActions, mapGetters } from 'vuex';
  // import helper functions
  import {
    has,
    isNil,
    isArray,
    isObject,
  } from 'lodash';
  // import nested components
  import MapBasic from './MapBasic';
  import AppLink from './AppLink';
  // import filters
  import dateFilters from '@/filters/dateFilters';
  import { getTranslationFor, getCountryFlagImg, truncate } from '@/utils/helpers';
  import filtersMixin from '@/mixins/filters';
  /* The maximum length of a keyword */
  const MAX_KEYWORD_LENGTH = 10;

  export default {
    name: 'DatasetDetailsDataset',
    dependencies: 'DatasetService',
    components: {
      appLink: AppLink,
      mapBasic: MapBasic,
    },
    mixins: [filtersMixin],
    props: {
      disableIncorrectDateAlert: {
        type: Boolean,
        default: false,
      },
      disableTranslationAlert: {
        type: Boolean,
        default: false,
      },
      disableOptionsDropdown: {
        type: Boolean,
        default: false,
      },
    },
    metaInfo() {
      return {
        meta: [
          {
            name: 'description',
            vmid: 'description',
            content: (this.getDescription
              ? `${this.getTranslationFor(this.getDescription, this.$i18n.locale, this.getLanguages)}`
              : `${this.getTranslationFor(this.getTitle, this.$i18n.locale, this.getLanguages)}`).substr(0, 4999),
          },
          {
            name: 'keywords',
            vmid: 'keywords',
            content: this.getKeywords.map(k => k.title).join(' ').substr(0, 4999),
          },
          { property: 'robots', content: 'follow,noindex' },
        ],
        script: [{
          type: 'application/ld+json',
          json: this.datasetSchema,
        }],
      };
    },
    data() {
      return {
        loadingDatasetDetails: false,
        dateIncorrect: false,
        machineTranslated: false,
        translationUpdateProcessing: false,
        translationNotAvailable: false,
        mapVisible: true,
        infoVisible: false,
        visualisationLinkFormats: [
          'csv',
          'xlsx',
          'xls',
        ],
        geoLinkFormats: {
          wms: 'WMS',
          geojson: 'GeoJSON',
          fiware_cb: 'fiware_cb',
          'fiware-cb': 'fiware_cb',
        },
        maxKeywordLength: MAX_KEYWORD_LENGTH,
        datasetSchema: {},
      };
    },
    computed: {
      // import store-getters
      ...mapGetters('datasetDetails', [
        'getCatalog',
        'getCategories',
        'getConformsTo',
        'getContactPoints',
        'getCountry',
        'getDescription',
        'getDistributions',
        'getDistributionFormats',
        'getDocumentations',
        'getFrequency',
        'getID',
        'getIdentifiers',
        'getIdName',
        'getKeywords',
        'getLandingPages',
        'getLanguages',
        'getLicences',
        'getLoading',
        'getModificationDate',
        'getOriginalLanguage',
        'getOtherIdentifiers',
        'getProvenances',
        'getPublisher',
        'getRelatedResources',
        'getReleaseDate',
        'getSources',
        'getSpatial',
        'getTranslationMetaData',
        'getTitle',
      ]),
    },
    methods: {
      // import store-actions
      ...mapActions('datasetDetails', [
        'loadDatasetDetails',
        'setLoading',
        'useService',
      ]),
      // Lodash has function
      has,
      isNil,
      isArray,
      isObject,
      getTranslationFor,
      getCountryFlagImg,
      truncate,
      getSchemaOfSpatialCoverage() {
        let spatialCoverage = null;

        const spatial = this.getSpatial;
        if (spatial.type === 'Polygon') {
          const places = [];
          const polygons = spatial.coordinates;
          polygons.forEach((polygon) => {
            let poly = '';
            poly = polygon.map(coordinate => coordinate.join(',')).join(' ');
            const geoShape = {
              '@type': 'GeoShape',
              polygon: poly,
            };
            places.push({
              '@type': 'Place',
              geo: geoShape,
            });
          });

          spatialCoverage = places;
        } else if (spatial.type === 'Point') {
          spatialCoverage = {
            '@type': 'Place',
            geo: {
              '@type': 'GeoCoordinates',
              latitude: spatial.coordinates[0],
              longitude: spatial.coordinates[1],
            },
          };
        }

        return spatialCoverage;
      },
      // Returns a json-ld object of the license of the first distribution where a license exists in this dataset
      // or null, if first distribution or license does not exist
      getSchemaOfFirstAvailableLicense() {
        let license = null;
        const licenses = this.getLicences;

        if (licenses && licenses.length > 0) {
          const distributionLicense = this.getLicences.find(l => l.title || l.description || l.id || l.resource);

          if (distributionLicense) {
            const name = distributionLicense.title;
            const description = distributionLicense.description;
            const identifier = distributionLicense.id;
            const url = distributionLicense.resource;

            license = {
              '@type': 'CreativeWork',
              ...name && { name },
              ...description && { description },
              ...identifier && { identifier },
              ...url && { url },
            };
          }
        }
        return license;
      },
      getSchemaOrg() {
        const distribution = [];
        this.getDistributions.forEach((distro) => {
          const distroResult = {
            '@type': 'DataDownload',
            name: this.getDistributionTitle(distro),
            encodingFormat: this.getDistributionFormat(distro),
          };
          if (this.showAccessUrl(distro)) {
            distroResult.contentUrl = distro.accessUrl;
          }
          distribution.push(distroResult);
        });
        const name = this.getTranslationFor(this.getTitle, this.$i18n.locale, this.getLanguages) || '';
        const description = this.getTranslationFor(this.getDescription, this.$i18n.locale, this.getLanguages) || '';
        const license = this.getSchemaOfFirstAvailableLicense();
        const spatialCoverage = this.getSchemaOfSpatialCoverage();
        const payload = {
          '@context': 'http://schema.org',
          '@type': 'Dataset',
          distribution,
          name: name.substr(0, 4999),
          description: description.substr(0, 4999),
          keywords: [],
          creator: [],
          ...license && { license },
          ...spatialCoverage && { spatialCoverage },
        };
        if (this.showKeywords(this.getKeywords)) {
          this.getKeywords.forEach((keyword) => {
            if (this.showKeyword(keyword)) {
              payload.keywords.push(keyword.title);
            }
          });
        }
        if (isObject(this.getPublisher) && has(this.getPublisher, 'name') && !isNil(this.getPublisher.name)) {
          payload.creator.push({
            '@type': 'Organization',
            name: this.getPublisher.name,
          });
        }
        return payload;
      },
      filterDateFormatUS(date) {
        return dateFilters.formatUS(date);
      },
      filterDateFormatEU(date) {
        return dateFilters.formatEU(date);
      },
      filterDateFromNow(date) {
        return dateFilters.fromNow(date);
      },
      showOriginalLanguage(originalLanguage) {
        return !isNil(originalLanguage);
      },
      getDatasetOriginalLanguage(originalLanguage) {
        return { query: Object.assign({}, this.$route.query, { locale: originalLanguage }) };
      },
      setDatasetOriginalLanguage(originalLanguage) {
        this.$i18n.locale = originalLanguage;
      },
      getDistributionFormat(distribution) {
        return has(distribution, 'format.title') && !isNil(distribution.format.title) ? distribution.format.title : '';
      },
      distributionFormatTruncated(distribution) {
        return this.getDistributionFormat(distribution).length > 4;
      },
      getDistributionTitle(distribution) {
        return distribution.title ? getTranslationFor(distribution.title, this.$i18n.locale, this.getLanguages) : '-';
      },
      getDistributionDescription(distribution) {
        return (has(distribution, 'description') && !isNil(distribution.description)) ? getTranslationFor(distribution.description, this.$i18n.locale, this.getLanguages) : '-';
      },
      showLicence(distribution) {
        return (has(distribution, 'licence.title') && !isNil(distribution.licence.title))
            || (has(distribution, 'licence.resource') && !isNil(distribution.licence.resource));
      },
      showLicensingAssistant(distribution) {
        return has(distribution, 'licence.la_url') && !isNil(distribution.licence.la_url);
      },
      showOptionsDropdown(distribution) {
        return this.showVisualisationLink(distribution) || this.showGeoLink(distribution);
      },
      showVisualisationLink(distribution) {
        if (!has(distribution, 'format.title') || isNil(distribution.format.title) || !has(distribution, 'accessUrl') || isNil(distribution.accessUrl)) return false;
        const f = distribution.format.title.toLowerCase();
        // Show VisualisationLink only for formats included in visualisationLinkFormats
        return this.visualisationLinkFormats.includes(f);
      },
      getVisualisationLink(accessUrl) {
        // Return Visualisation Link
        return `/data/visualisation/?file=${accessUrl}`;
      },
      showGeoLink(distribution) {
        if (!has(distribution, 'format.title') || isNil(distribution.format.title) || !has(distribution, 'id') || isNil(distribution.id)) return false;
        const f = distribution.format.title.toLowerCase();
        // Show GeoLink only for formats included in geoLinkFormats
        return Object.keys(this.geoLinkFormats).includes(f);
      },
      getGeoLink(format, distributionID) {
        let f = format.toLowerCase();
        // Use correct Case Sensitive strings
        f = this.geoLinkFormats[f];
        // Return Geo Visualisation Link
        return `/mapapps/?lang=en&type=${f}&dataset=${distributionID}`;
      },
      showDownloadDropdown(distribution) {
        return this.showAccessUrl(distribution) || this.showDownloadUrls(distribution);
      },
      showAccessUrl(distribution) {
        return has(distribution, 'accessUrl') && !isNil(distribution.accessUrl);
      },
      showDownloadUrls(distribution) {
        return has(distribution, 'downloadUrls') && !isNil(distribution.downloadUrls) && isArray(distribution.downloadUrls) && distribution.downloadUrls.length > 0;
      },
      setClipboard(value) {
        const input = document.createElement('INPUT');
        // input.style = "position: absolute; left: -1000px; top: -1000px";
        input.value = value;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
      },
      showKeywords(keywords) {
        return !isNil(keywords) && keywords.length > 0;
      },
      showKeyword(keyword) {
        return !isNil(keyword) && has(keyword, 'id') && has(keyword, 'title');
      },
      getKeywordLink(keyword) {
        return { path: `/datasets?keywords=${keyword.id}`, query: Object.assign({}, { locale: this.$route.query.locale }) };
      },
      keywordTruncated(keyword) {
        return keyword.title.length > this.maxKeywordLength;
      },
      showSpatial(spatial) {
        return !isNil(spatial) && has(spatial, 'coordinates') && !isNil(spatial.coordinates) && has(spatial, 'type') && !isNil(spatial.type);
      },
      toggleMap() {
        this.$refs.geocollapse.classList.toggle('show');
        this.mapVisible = !this.mapVisible;
      },
      toggleInfo() {
        this.infoVisible = !this.infoVisible;
      },
      setTranslationBanners() {
        if (!this.$i18n) return;
        const translationMetaData = this.getTranslationMetaData;
        // Check if translation of dataset is available in selected language
        if (!isNil(translationMetaData.details) && has(translationMetaData.details, this.$i18n.locale)) {
          // Check if dataset if machine translated
          this.machineTranslated = translationMetaData.details[this.$i18n.locale].machine_translated;
        } else {
          // No translation of this dataset available for the selected language
          this.translationNotAvailable = true;
        }
        // Check if updated translation of dataset is processing
        if (translationMetaData.status === 'processing') this.translationUpdateProcessing = true;
      },
      // Emit a Matomo event when user clicks on 'go to resource' element
      trackGoto() {
        // eslint-disable-next-line
        const paq = window._paq || [];
        paq.push(['trackEvent', 'GoToResource', 'Clicked']);
      },
    },
  created() {
    this.useService(this.DatasetService);
    this.$nextTick(() => {
      this.$Progress.start();
      this.loadingDatasetDetails = true;
      this.loadDatasetDetails(this.$route.params.ds_id)
        .then(() => {
          this.$Progress.finish();
          this.loadingDatasetDetails = false;
          this.datasetSchema = this.getSchemaOrg();
          this.$nextTick(() => {
            // Display/hide translation banners
            this.setTranslationBanners();
            // Activate bootstrap tooltips
            // $('[data-toggle="tooltip"]').tooltip({
            //   container: 'body',
            // });
          });
      });
      this.$root.$on('date-incorrect', () => {
        this.dateIncorrect = true;
      });
    });
  },
  destroyed() {
    this.$root.$off('date-incorrect');
  },
};
</script>

<style lang="scss" scoped>
  @import '~@/styles/bootstrap_theme';

  .heading, .arrow, .copy-text {
    cursor: pointer;
  }
  .text-break {
    word-break: break-word;
  }
  .circle {
    width: 40px;
    height: 40px;
    margin: 0 auto;
    padding: 20px 0;
    font-size: 12px;
    line-height: 1px;
    border-radius: 50%;
    background-color: #000000;
    &[type="HTML"] {
      background-color: #00a8cc;
    }
    &[type="JSON"] {
      background-color: #feb72b;
    }
    &[type="XML"] {
      background-color: #feb72b;
    }
    &[type="TXT"] {
      background-color: #b21f66;
    }
    &[type="CSV"] {
      background-color: #ffbd69;
    }
    &[type="XLS"] {
      background-color: #899857;
    }
    &[type="ZIP"] {
      background-color: #21243d;
    }
    &[type="API"] {
      background-color: #ec96be;
    }
    &[type="PDF"] {
      background-color: #ff7c7c;
    }
    &[type="RDF"],
    &[type="NQUAD"],
    &[type="NTRIPLES"],
    &[type="TURTLE"] {
      background-color: #0b4498;
    }
  }

  .resource-dropdown-form {
    width: 500px;
    form {
      max-width: 100%;
      .form-group:last-child {
        margin-bottom: 0;
      }
    }
  }

  /*** BOOTSTRAP ***/
  button:focus {
    outline:0;
  }
  .options, .download {
    .dropdown-menu {
      min-width: 300px;
      .dropdown-item {
        &:hover {
          color: initial;
          background-color: initial;
        }
      }
    }
  }
  /*** MATERIAL ICONS ***/
  .material-icons.small-icon {
    font-size: 20px;
  }
</style>
