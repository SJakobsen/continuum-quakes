import { describe, it, expect, beforeEach } from "vitest";

import { VueWrapper, mount } from "@vue/test-utils";
import QuakeList from "../QuakeList.vue";
import { key, quakeStore } from "@/state/quakeStore";

describe("QuakeList", () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = mount(QuakeList, {
      props: {},
      global: {
        provide: {
          [key]: quakeStore,
        },
      },
    });
  });

  it("renders properly", () => {
    expect(wrapper.text()).toContain("No data found");
  });
});
