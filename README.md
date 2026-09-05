# Airashi Online Shop

This is Airashi's online shop.
It uses Next.js, Redux, Redux Persist, React Intl, Firebase, Hooks, SCSS and BEM.

## Getting started

It's easy to have it running locally.
Just do a `yarn install` to install the dependencies.
Then do a `yarn dev` to run it locally.

## Versions

- **0.1:** Added Airashi designs and products
- **0.2:** Added internationalization
- **1.0:** Set up the Firebase product database
- **1.1:** Added database-backed i18n and currency conversion

## Available pages

- Home page: /
- Products page: /products
- Product single page: /product/1
- Cart page: /cart
- Login page: /login
- Register page: /register
- 404 page: /page-not-found

## Backend

The product API uses Firebase when configured. Local product data is kept in
`src/utils/data` for product detail pages and development.

## Development

```sh
yarn install
yarn dev
```

Set `PROJECT_ID`, `PRIVATE_KEY`, `CLIENT_EMAIL`, `DATABASE_NAME`, and `REGION`
to enable the Firebase API route.
