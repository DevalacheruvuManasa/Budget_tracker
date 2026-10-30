# Pocketwise

A responsive personal expense tracker built with React, Vite, and JavaScript.
Transactions are stored in your browser using LocalStorage.

## Requirements

- Node.js 20.19+ (or 22.12+)
- npm

## Getting started

```sh
npm install
npm run dev
```

Vite prints the local development URL after startup.

## Features

- Add, edit, and delete income and expense transactions.
- Search transactions and filter by type, category, and date range.
- View balance, income, expenses, and monthly savings at a glance.
- Explore spending categories, monthly income and expenses, and savings trends.
- Keep transaction data between browser sessions with LocalStorage.

## Available scripts

- `npm run dev` — start the development server
- `npm run build` — create a production build
- `npm run preview` — preview the production build
- `npm run lint` — run Oxlint
- `npm run cypress:open` — open the Cypress runner
- `npm run cypress:run` — run Cypress tests headlessly

For Cypress end-to-end tests, start the dev server in one terminal and run
`npm run cypress:run` in another.
