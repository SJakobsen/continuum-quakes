<script setup lang="ts">
import { useQuakeStore, type QuakeFeature } from "@/state/quakeStore";
import { onMounted, onUnmounted } from "vue";
import type { SubscribeOptions } from "vuex";

const store = useQuakeStore();

const alertColourMap = new Map<string, string>([
  ["green", "green-accent-3"],
  ["yellow", "yellow-accent-3"],
  ["orange", "orange-accent-3"],
  ["red", "red-accent-3"],
]);
</script>

<template>
  <v-list v-if="store.getters.filteredQuakes?.length > 0" lines="one">
    <v-list-item
      v-for="quake in store.getters.filteredQuakes"
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
