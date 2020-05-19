<template>
  <div class="distribution-details container-fluid">
    <div class="row">
      <div class="col-8">
        <section class="card">
          <div class="card-header">
            <h1 class="card-title">
              {{ getTitle }}
            </h1>
          </div>
          <div class="description card-body">
            <h2 class="card-title">
              {{ $t('message.metadata.description') }}
            </h2>
            <p>{{ getDescription || '-' }}</p>
          </div>
          <div
            v-if="!!getDownloadUrl"
            class="card-footer"
          >
            <linkCopyBar :link="{ title: $t('message.distributions.footerLink'), url: getDownloadUrl, target: '_blank' }" />
          </div>
        </section>
      </div>
      <div class="col-4">
        <aside class="metadata card">
          <div class="card-body">
            <dl>
              <dt>{{ $t('message.metadata.format') }}</dt>
              <dd>{{ getFormat || '-' }}</dd>
              <dt>{{ $t('message.metadata.created') }}</dt>
              <dd>{{ getReleaseDate | formatUS }}</dd>
              <dt>{{ $t('message.metadata.updated') }}</dt>
              <dd>{{ getModificationDate | fromNow }}</dd>
            </dl>
          </div>
        </aside>
      </div>
    </div>
    <div
      v-if="true"
      class="row mt-3"
    >
      <div class="col">
        <section class="data-visualisation card">
          <chart :dist-id="'1'" />
          <!--<datastore-line-chart :dist-id="$route.params.dist_id" :dist-title="getTitle"/>-->
        </section>
      </div>
    </div>
  </div>
</template>

<script>
  // import Actions and Getters from Store Module
  import { mapActions, mapGetters } from 'vuex';
  // import nested components
  import DatastoreLineChart from '@/components/piveau-ui-core/data-visualisation/DatastoreLineChart';
  import LinkCopyBar from '@/components/piveau-ui-core/LinkCopyBar';
  import Chart from '@/components/piveau-ui-core/data-visualisation/Chart';
  // import filters
  import dateFilters from '@/filters/dateFilters';

  export default {
    name: 'DistributionDetails',
    dependencies: 'DistributionService',
    components: {
      datastoreLineChart: DatastoreLineChart,
      linkCopyBar: LinkCopyBar,
      chart: Chart,
    },
    data() {
      return {};
    },
    computed: {
      ...mapGetters('distributionDetails', [
        'getAccessUrl',
        'getDescription',
        'getFormat',
        'getId',
        'getLicence',
        'getModificationDate',
        'getReleaseDate',
        'getTitle',
        'getDownloadUrl',
        'getUrlType',
      ]),
    },
    methods: {
      ...mapActions('distributionDetails', [
        'loadDistributionDetails',
        'useService',
      ]),
      filterDateFormatUS(date) {
        return dateFilters.formatUS(date);
      },
      filterDateFromNow(date) {
        return dateFilters.fromNow(date);
      },
    },
    filters: {
      formatUS: dateFilters.formatUS,
      fromNow: dateFilters.fromNow,
    },
    watch: {},
    created() {
      this.useService(this.DistributionService);
      this.$nextTick(() => {
        this.$Progress.start();
        this.loadDistributionDetails(this.$route.params.dist_id)
          .then(() => {
            this.$Progress.finish();
          })
          .catch(() => {
            this.$Progress.fail();
          });
      });
    },
    mounted() {
    },
  };
</script>

<style lang="scss" scoped>
</style>
