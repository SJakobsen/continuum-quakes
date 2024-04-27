import axios from "axios";
import type { Feature, Point } from "geojson";
import type { InjectionKey } from "vue";
import { Store, createStore, useStore, type GetterTree } from "vuex";

/**
 * Properties specific to our earthquake API.
 * Taken from https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php
 */
export interface QuakeProperties {
  mag: number;
  place: string;
  time: number;
  updated: number;
  tz: number;
  url: string;
  detail: string;
  felt: number;
  cdi: number;
  mmi: number;
  alert: string;
  status: string;
  tsunami: number;
  sig: number;
  net: string;
  code: string;
  ids: string;
  sources: string;
  types: string;
  nst: number;
  dmin: number;
  rms: number;
  gap: number;
  magType: string;
  type: string;
}

export type QuakeFeature = Feature<Point, QuakeProperties>;

/**
 * Structure of earthquake store state.
 */
export interface QuakeState {
  /** Is the data currently being fetched. */
  fetching: boolean;
  filter: {
    place: string;
  };
  /** A quake focused by a user interaction on the map. */
  focusedQuake?: QuakeFeature;
  quakes: QuakeFeature[];
}

export interface QuakeGetters {
  /**
   * Get the earthquakes filtered by user input.
   */
  filteredQuakes(state: QuakeState): QuakeFeature[];
}

export interface QuakeStore extends Store<QuakeState> {
  getters: {
    [K in keyof QuakeGetters]: ReturnType<QuakeGetters[K]>;
  };
}

const getters: GetterTree<QuakeState, QuakeState> & QuakeGetters = {
  filteredQuakes(state) {
    return state.quakes.filter((quake) =>
      quake.properties.place.toLowerCase().includes(state.filter.place)
    );
  },
};

// Injection key for the store
export const key: InjectionKey<Store<QuakeState>> = Symbol();

// Store instance
export const store = createStore<QuakeState>({
  state: {
    fetching: false,
    filter: {
      place: "",
    },
    quakes: [],
  },
  getters,
  mutations: {
    setFetching(state, fetching: boolean): void {
      state.fetching = fetching;
    },
    setPlaceFilter(state, filter: string): void {
      state.filter.place = filter;
    },
    setFocusedQuake(state, quake?: QuakeFeature): void {
      state.focusedQuake = quake;
    },
    setQuakes(state, quakes: QuakeFeature[]): void {
      state.quakes = quakes;
    },
  },
  actions: {
    fetchQuakes(context) {
      context.commit("setFetching", true);
      axios
        .get(
          "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson"
        )
        .then((quakes) => {
          context.commit("setQuakes", quakes.data?.features ?? []);
        })
        .finally(() => context.commit("setFetching", false));
    },
  },
});

/**
 * Get the earthquake data store.
 * @returns the vuex store for earthquake data
 */
export function useQuakeStore(): QuakeStore {
  return useStore<QuakeState>(key);
}
