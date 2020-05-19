/*
The footer component.

Customize the default footer component or create your own here.
*/

<template>
  <bottom>
    <!-- Use default footer but with different logo -->

    <template #logo>
      <app-link
        class="footer-link"
        target="_blank"
        to="https://www.internationaldataspaces.org/"
      >
        <img
          src="@/assets/img/IDSA-Logo.png"
          width="125"
          alt="Piveau Icon"
        >
      </app-link>
    </template>
  </bottom>
</template>

<script>
import Bottom from '@/components/piveau-ui-core/Bottom';
import AppLink from '@/components/piveau-ui-core/AppLink';

export default {
  name: 'TheFooter',
  components: {
    Bottom,
    AppLink
  }
}
</script>

<style>

</style>
