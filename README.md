# continuum-quakes

Hi 👋

I am new to Vue.js, Vuex and MapBox so used this as an opportunity to learn. It's safe to say though that this was the major challenge for me in developing this solution.

Learning enough of the framework, introducing a unique state management solution and grappling with a (to a newcomer) massive and complicated MapBox API... It was a lot. But I'm ultimately happy with my solution.

I also chose to use vuitify for some simple components. I heard this mentioned during my initial interview and felt curious to give it a try. Any complications here then were self imposed. 😇

I did attempt to write unit tests but here I think my knowledge with the frameworks started to hit walls. For example, tests that rely on updating the vuex store to then update the UI gave me issues until I resigned myself to leaving these.

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

And, again: please add a MapBox token into [.env](./.env) before starting the app.

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```
