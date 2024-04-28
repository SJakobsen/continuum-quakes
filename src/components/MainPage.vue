<script setup lang="ts">
import { useQuakeStore } from "@/state/quakeStore";
import { onMounted } from "vue";
import Map from "./Map.vue";
import QuakeList from "./QuakeList.vue";

const store = useQuakeStore();

onMounted(() => {
  store.dispatch("fetchQuakes");
});
</script>

<template>
  <h2 v-if="store.state.fetching">Loading...</h2>
  <div v-else class="container">
    <v-text-field
      class="filter"
      label="Filter"
      v-model="store.state.filter.place"
    ></v-text-field>
    <div class="list">
      <QuakeList />
    </div>
    <div class="map">
      <Map />
    </div>
  </div>
</template>

<style scoped>
.filter {
  grid-area: filter;
}
.list {
  grid-area: list;
  overflow: scroll;
}
.map {
  grid-area: map;
}
.container {
  height: 100%;
  display: grid;
  grid-template-rows: min-content auto;
  grid-template-columns: 1fr 2fr;
  grid-template-areas:
    "filter filter"
    "list map";
  grid-column-gap: 2rem;
  grid-row-gap: 1rem;
}

@media (max-width: 720px) {
  .container {
    height: 100%;
    display: grid;
    grid-template-rows: min-content auto;
    grid-template-columns: auto;
    grid-template-areas:
      "filter"
      "list"
      "map";
    grid-row-gap: 1rem;
  }
}
</style>
