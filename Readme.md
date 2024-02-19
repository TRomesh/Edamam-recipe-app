# Edamam's Recipe App

## Demo

[![Netlify Status](https://api.netlify.com/api/v1/badges/db918347-d72d-4aa1-bc4d-52152ddaa227/deploy-status)](https://app.netlify.com/sites/edamam-recipes-app/deploys)

- Live web app : [Edamam-recipe-app](https://edamam-recipes-app.netlify.app/)

## Project setup

- Clone the project and add the Environment variabel (.env) file in the root directory by reffering .env.production files

#### Add the necessary Keys susch as APPLICATION_ID and APPLICATION_KEY and BASE_URL(Edamam Recipe Search API URL)

```
VITE_BASE_URL=
VITE_APPLICATION_ID=
VITE_APPLICATION_KEY=
```

---

## Installing dependencies

- Run the following commands in project root

```
# Inside Client
$ yarn install (or npm install)

```

---

## Starting the project in Development

- Run the following commands in project root

```
# Inside Client
$ yarn dev
    # or
$ npm run dev

```

---

## Tests

- Run the following commands in project root to run unit tests

```
# Inside client
$ yarn test
    # or
$ npm run test
```

### Libraries used

- [axios](https://github.com/axios/axios)
- [Chakra-UI](https://chakra-ui.com/)
- [debounce](https://github.com/lodash/lodash)
- [react-router-dom](https://reactrouter.com/en/main)
- [zustand](https://zustand-demo.pmnd.rs/)
- [vitest](https://vitest.dev/)
- [react-testing-library](https://testing-library.com/docs/react-testing-library/intro/)
