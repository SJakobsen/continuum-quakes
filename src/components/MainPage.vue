<script setup lang="ts">
import { useQuakeStore } from "@/state/quakeStore";
import { onMounted, ref } from "vue";
import Map from "./Map.vue";
import QuakeList from "./QuakeList.vue";

const quakeData = ref({});

const store = useQuakeStore();

onMounted(() => {
  store.dispatch("fetchQuakes");
});
</script>

<template>
  <v-text-field
    label="Filter"
    v-model="store.state.filter.place"
  ></v-text-field>
  <h2 v-if="store.state.fetching">Loading...</h2>
  <div v-else class="container">
    <QuakeList />
    <div class="growable">
      <Map />
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 750px) {
  .container {
    flex-direction: column;
  }
}

.container {
  display: flex;
  gap: 2em;
  height: 100%;
  flex-wrap: wrap;
}
.growable {
  flex-grow: 1;
}
</style>
