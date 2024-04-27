import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import QuakeList from "../QuakeList.vue";
import { key, quakeStore } from "@/state/quakeStore";

describe("QuakeList", () => {
  it("renders properly", () => {
    const wrapper = mount(QuakeList, {
      props: {},
      global: {
        provide: {
          [key]: quakeStore,
        },
      },
    });
    expect(wrapper.text()).toContain("No data found");
  });
});
