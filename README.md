# nt-stock-report
A basic stock report built with web components.

## Tech stack
- Web components ([Lit](https://lit.dev/)) for building the UI
- [Redux](https://redux-toolkit.js.org/) for state management
- [Jest]() + [Testing Library](https://testing-library.com/) for testing
- [Webpack](https://webpack.js.org/) for bundling
- [json-server](https://github.com/typicode/json-server) to mimic a Backend

## Commands
### Instalation
`npm install`

### Run the app
`npm start` to develop
`npm run start:build` to run the app with the producion bundle

### Tests
`npm test`

### Other
You can run `npm run restore-db` to populate the dummy db with the initial data.

## User stories (iterations)
- IT-1 As a user I can see the stock report
  - IT-11 Create basic components (image, product details...)
  - IT-12 Create Size Stock Stats component
  - IT-13 Create WH coverage component
- IT-2 As a user I can mark a product as complete
  - IT-21 Show complete button when hovering the product card
  - IT-22 Show a confirmation modal to mark as complete
  - IT-23 Add mark as complete funcionality

