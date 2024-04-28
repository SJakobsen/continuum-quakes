import { describe, it, expect } from "vitest";

import { getters, type QuakeState } from "./quakeStore";

const createQuake = (id: string, place: string) => {
  return {
    id,
    properties: {
      place,
    },
  };
};

describe("QuakeStore", () => {
  const { filteredQuakes } = getters;

  describe("filteredQuakes", () => {
    it("ignores case", () => {
      const state = {
        quakes: [
          createQuake("1", "LOWERCASE"),
          createQuake("2", "does not match"),
        ],
        filter: {
          place: "lowercase",
        },
      } as QuakeState;

      const filtered = filteredQuakes(state);

      expect(filtered.length).toEqual(1);
      expect(filtered[0].properties.place).toEqual("LOWERCASE");
    });

    it("returns empty list when no matches", () => {
      const state = {
        quakes: [createQuake("1", "does not match")],
        filter: {
          place: "nonsense",
        },
      } as QuakeState;

      const filtered = filteredQuakes(state);

      expect(filtered).toEqual([]);
    });
  });
});
