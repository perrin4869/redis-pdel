# redis-pdel

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coverage Status][coveralls-badge]][coveralls]
[![Dependency Status][dependency-status-badge]][dependency-status]
[![devDependency Status][dev-dependency-status-badge]][dev-dependency-status]

> pdel lua command for redis clients

## pdel redis command

Deletes all the keys matching a specific regex, for example

```
set foo:one val
set foo:two val
pdel foo:*
get foo:one <- nil
get foo:two <- nil
```

Note: this is *not* meant to be used in production. Supports Node 4+.

## Install

```
$ npm install --save redis-pdel
```

## Usage

The easiest usecase is to use with [https://github.com/luin/ioredis](ioredis) as follows:

```js
const Redis = require('ioredis');
const redis = new Redis();
require('redis-pdel').install(redis);
```

Additionally, the necessary information is exported:

```js
const Redis = require('ioredis');
const { name, lua, numberOfKeys } = require('redis-pdel');
const redis = new Redis();
redis.defineCommand(name, { lua, numberOfKeys });
```

Then, just run like any other command:

```js
redis.pdel('foo:*');
```

## Tests

There are unit tests and integration tests. Needs Node 6+ to run. The integration tests require redis to be installed.

```bash
npm test:unit
npm test:integration
npm test # run both tests
```

## License

See the [LICENSE](LICENSE.md) file for license rights and limitations (MIT).

[build-badge]: https://img.shields.io/travis/perrin4869/redis-pdel/master.svg?style=flat-square
[build]: https://travis-ci.org/perrin4869/redis-pdel

[npm-badge]: https://img.shields.io/npm/v/redis-pdel.svg?style=flat-square
[npm]: https://www.npmjs.org/package/redis-pdel

[coveralls-badge]: https://img.shields.io/coveralls/perrin4869/redis-pdel/master.svg?style=flat-square
[coveralls]: https://coveralls.io/r/perrin4869/redis-pdel

[dependency-status-badge]: https://david-dm.org/perrin4869/redis-pdel.svg?style=flat-square
[dependency-status]: https://david-dm.org/perrin4869/redis-pdel

[dev-dependency-status-badge]: https://david-dm.org/perrin4869/redis-pdel/dev-status.svg?style=flat-square
[dev-dependency-status]: https://david-dm.org/perrin4869/redis-pdel#info=devDependencies
