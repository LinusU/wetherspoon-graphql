# GraphQL interface to Wetherspoon API

This repo contains a GraphQL server that exposes the Wetherspoon's API in an easy to use manner.

## Prerequisites

The server uses Redis to cache http requests, so you must have a Redis server up and running on `localhost`.

## Get Started

Clone this repo and run the following commands to start the server:

```sh
npm ci
npm start
```

The server will automatically reload when any changes to the source files are detected.
