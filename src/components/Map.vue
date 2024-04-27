<script setup lang="ts">
import { useQuakeStore, type QuakeFeature } from "@/state/quakeStore";
import { onMounted, onUnmounted, ref } from "vue";
import mapboxgl, { GeoJSONSource, Point } from "mapbox-gl";
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const store = useQuakeStore();
const mapContainer = ref<HTMLInputElement | null>(null);
let map: mapboxgl.Map;
/** The currently hovered quake on the map. */
let hoveredQuakeId: string | number | undefined;

/**
 * Remove hover feature state from any previously hovered features.
 * Set {@link hoveredQuakeId} and the {@link store}'s focusedQuake to be undefined.
 */
const removeHoverState = () => {
  // NOTE: ID could be zero and falsy so explicitly check for undefined
  if (hoveredQuakeId !== undefined) {
    map.setFeatureState(
      { source: "earthquakes", id: hoveredQuakeId },
      { hover: false }
    );
  }
  store.commit("setFocusedQuake", undefined);
  hoveredQuakeId = undefined;
};

// Update the earthquake source to only show filtered quakes
store.watch(
  (state, getters) => getters.filteredQuakes,
  (newValue: QuakeFeature[], oldValue) => {
    (map.getSource("earthquakes") as GeoJSONSource).setData({
      type: "FeatureCollection",
      features: newValue,
    });
  }
);

onMounted(() => {
  const initialQuake = store.getters.filteredQuakes?.[0] ?? undefined;
  const initialCenter = initialQuake
    ? [
        initialQuake.geometry.coordinates[0],
        initialQuake.geometry.coordinates[1],
      ]
    : [-4.251433, 55.860916];

  map = new mapboxgl.Map({
    container: mapContainer.value!,
    style: "mapbox://styles/mapbox/dark-v11",
    center: [initialCenter[0], initialCenter[1]],
    zoom: 3,
  });

  map.on("load", () => {
    map.addSource("earthquakes", {
      type: "geojson",
      // Use a URL for the value for the `data` property.
      data: {
        type: "FeatureCollection",
        features: store.state.quakes,
      },
      generateId: true,
    });

    map.addLayer({
      id: "quakes-layer",
      type: "circle",
      source: "earthquakes",
      paint: {
        "circle-radius": [
          "case",
          ["boolean", ["feature-state", "hover"], false],
          20,
          10,
        ],
        "circle-stroke-width": 2,
        "circle-color": ["string", ["get", "alert"]],
        "circle-stroke-color": "white",
      },
    });

    // Set hover feature state for quake points when moving over the layer.
    map.on("mousemove", "quakes-layer", (e) => {
      if (e?.features?.length && e.features.length > 0) {
        removeHoverState();

        let hoveredQuake = e.features[0];
        hoveredQuakeId = hoveredQuake.id;
        map.setFeatureState(
          { source: "earthquakes", id: hoveredQuakeId },
          { hover: true }
        );
        const focusedQuakeFeature = store.getters.filteredQuakes.find(
          (quake) => quake.properties.ids === hoveredQuake.properties?.ids
        );
        store.commit("setFocusedQuake", focusedQuakeFeature);
      }
    });

    // Remove hover feature state when completely leaving layer.
    map.on("mouseleave", "quakes-layer", () => {
      removeHoverState();
    });

    // Center the map on the coordinates of any clicked circle from the 'circle' layer.
    map.on("click", "quakes-layer", (e) => {
      map.flyTo({
        center: e.lngLatgi,
      });
    });
  });
});

onUnmounted(() => {
  map?.remove();
});
</script>

<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<style>
.map-container {
  flex: 1;
  height: 100%;
  min-height: 500px;
}
</style>
