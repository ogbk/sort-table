# sort-table

React SPA web page:
- loads json data into a table
- sorts data rows by selected field (uses helper function `app/utils/sortAlphaNum.js`)
- highlights and displays selected row


## Running locally

- `git clone` or download this repository
- `cd react-table` or `cd react-table-master`
- `npm install`
- run in dev mode: `npm run dev`
- run in prod mode: `npm run prod`


## Linting

- ESLint `npm run eslint`
- Sass lint `npm run sass-lint`


## Static typechecking with Flow

- Stop flow server `npm run flow stop`
- Start flow server `npm run flow start`
- Run flow `npm run flow status`