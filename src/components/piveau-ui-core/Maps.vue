<template>
  <div class="container-fluid maps">
    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">
              Explore FOKUS Weather Stations
            </h3>
          </div>
          <div class="card-body">
            <div
              id="mapid"
              ref="mapref"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import Leaflet from 'leaflet';
  // Import Leaflet Marker Images
  // BUG https://github.com/Leaflet/Leaflet/issues/4968
  import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
  import iconUrl from 'leaflet/dist/images/marker-icon.png';
  import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
  // Import glue-config.js
  import { glueConfig as GLUE_CONFIG } from '@/../config/user-config';

  // Fixes Markers img BUG --> https://github.com/Leaflet/Leaflet/issues/4968
  Leaflet.Marker.prototype.options.icon = Leaflet.icon({
    iconRetinaUrl,
    iconUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41],
  });

  export default {
    name: 'Maps',
    dependencies: 'MapService',
    metaInfo: {
      title: this.$t('message.navigation.navItems.map'),
      meta: [
        { name: 'description', vmid: 'description', content: `${this.$t('message.navigation.navItems.map')} - ${this.$t('message.header.european')} ${this.$t('message.header.dataPortal')}` },
        { name: 'keywords', vmid: 'keywords', content: `${GLUE_CONFIG.keywords} ${this.$t('message.navigation.navItems.map')}` },
        { property: 'robots', content: 'follow,noindex' },
      ],
    },
    data() {
      return {
        sensors: [],
      };
    },
    computed: {
      ...mapGetters('mapsData', [
        'getMap',
      ]),
    },
    methods: {
      ...mapActions('mapsData', [
        'useService',
        'loadMap',
      ]),
    },
    filters: {},
    watch: {},
    created() {
      this.useService(this.MapService);
    },
    mounted() {
      this.map = this.loadMap({
        Leaflet,
        containerId: 'mapid',
      });
    },
  };
</script>

<style lang="scss" scoped>
  #mapid {
    height: 600px;
    width: 100%;
  }
</style>
<style lang="scss">
  @import '~leaflet/dist/leaflet.css';
</style>
