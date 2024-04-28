<script setup lang="ts">
import MainPage from "./components/MainPage.vue";
import "../node_modules/mapbox-gl/dist/mapbox-gl.css";
</script>

<template>
  <header>
    <h1>QuakeWatch</h1>
  </header>

  <main>
    <MainPage />
  </main>
</template>

<style scoped>
@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  main {
    flex-grow: 1;
    height: 100%;
    overflow: hidden;
  }
}
</style>
