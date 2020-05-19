<!-- ABOUT page -->

<template>
  <div class="about container">
    <div class="row">
      <div class="col">
        <slot name="about-content-slot" />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'About',
  };
</script>

<style lang="scss" scoped>
</style>
