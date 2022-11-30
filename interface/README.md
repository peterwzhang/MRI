## Getting Started

To build the system, you'll need to install the latest version of [Node.js](https://nodejs.org/en/) (v18) and [Yarn](https://yarnpkg.com/).

Once you have these, install the dependencies (must be run from this folder, only needed once or if dependencies change):

```sh
yarn install
```

Then, you can run the development server:

```bash
yarn start
```

Then, open [https://localhost:3000](https://localhost:3000) with your browser to see the
result.

To test against a local backend, edit `./api/constants.ts` -- you'll need to run the backend locally from another terminal or VS Code window. Be sure to see the notes in the backend README if you decide to do this.
