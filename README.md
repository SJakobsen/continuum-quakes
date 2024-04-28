# continuum-quakes

Hi 👋

I am new to Vue.js and MapBox so used this as an opportunity to learn as much as anything else 😇

## MapBox Token Needed

Please add a MapBox token into [.env](./.env) before starting the app.

## Quirks I had

There may be some clash with Vue.js and typescript after I created the app using `npm create vue@latest`. Essentially, installed types weren't getting picked up. Hence the inclusion of [vuex.d.ts](./vuex.d.ts) as a workaround.

This should hopefully resolve any issues for you too.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
