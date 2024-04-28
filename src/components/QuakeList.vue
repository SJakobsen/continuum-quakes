<script setup lang="ts">
import { useQuakeStore } from "@/state/quakeStore";
import { onMounted } from "vue";

const store = useQuakeStore();

const alertColourMap = new Map<string, string>([
  ["green", "green-accent-3"],
  ["yellow", "yellow-accent-3"],
  ["orange", "orange-accent-3"],
  ["red", "red-accent-3"],
]);

onMounted(() => {
  // For when the list becomes scrollable, scroll the focused quake into view.
  // Ignore for smaller screen sizes to avoid jumping around.
  store.subscribe((mutation, state) => {
    if (
      mutation.type === "setFocusedQuake" &&
      mutation.payload &&
      window.innerWidth > 720
    ) {
      const toScroll = document.getElementById(
        `quakeListItem_${state.focusedQuake?.id}`
      );
      toScroll?.scrollIntoView();
    }
  });
});
</script>

<template>
  <v-list v-if="store.getters.filteredQuakes?.length > 0" lines="one">
    <v-list-item
      v-for="quake in store.getters.filteredQuakes"
      :id="`quakeListItem_${quake.id}`"
      :key="quake.id"
      :title="quake.properties.place"
      :subtitle="'Magnitude: ' + quake.properties.mag"
      :variant="quake.id === store.state.focusedQuake?.id ? 'tonal' : 'text'"
    >
      <template v-slot:prepend>
        <v-icon
          icon="mdi-alert-circle"
          :color="alertColourMap.get(quake.properties.alert) ?? 'primary'"
        />
      </template>
    </v-list-item>
  </v-list>

  <v-card v-else min-width="300px" class="no-data">
    <v-card-text>No data found</v-card-text>
  </v-card>
</template>

<style></style>
