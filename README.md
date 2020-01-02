# Express TS Starter

Express TS Starter Kit. Developed by using <a href="https://www.npmjs.com/package/generator-express-no-stress-typescript" target="_blank"><h4>generator-express-no-stress-typescript</h4></a>

## Quick Start

Get started developing...

```shell
# install deps
npm install

# run in development mode
npm run dev

# run tests
npm run test
```

---

## Install Dependencies

Install all package dependencies (one time operation)

```shell
npm install
```

## Run It
#### Run in *development* mode:
Runs the application is development mode. Should not be used in production

```shell
npm run dev
```

or debug it

```shell
npm run dev:debug
```

#### Run in *production* mode:

Compiles the application and starts it in production production mode.

```shell
npm run compile
npm run hostentry
npm start
```
OR

```shell
npm run compile
npm run deploy
```

## Test It

Run the Mocha unit tests

```shell
npm test
```

or debug them

```shell
npm run test:debug
```

## Try It
* Open you're browser to [http://localhost:8000](http://localhost:8000)
* Invoke the `/api-explorer` endpoint 
  ```shell
  curl http://localhost:8000/api-explorer
  ```


## Debug It

#### Debug the server:

```
npm run dev:debug
```

#### Debug Tests

```
npm run test:debug
```

#### Debug with VSCode

launch.json & tasks.json included
