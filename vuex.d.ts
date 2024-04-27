// There seems to be an issue with vuex and potentially my version of typescript after using the vue project initialiser.
// With peace and love, I'm referencing the correct types here and not worrying too much about it.
declare module "vuex" {
  export * from "vuex/types/index.d.ts";
  export * from "vuex/types/helpers.d.ts";
  export * from "vuex/types/logger.d.ts";
  export * from "vuex/types/vue.d.ts";
}

declare module "geojson" {
  export * from "@types/geojson/index.d.ts";
}
