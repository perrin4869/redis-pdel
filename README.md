# redis-mdel

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coverage Status][coveralls-badge]][coveralls]
[![Dependency Status][dependency-status-badge]][dependency-status]
[![devDependency Status][dev-dependency-status-badge]][dev-dependency-status]

> mdel lua command for redis clients

## mdel redis command

Deletes all the keys matching a specific regex, for example

```
set foo:one val
set foo:two val
mdel foo:*
get foo:one <- nil
get foo:two <- nil
```

Note: this is *not* meant to be used in production. Supports Node 4+.

## Install

```
$ npm install --save redis-mdel
```

## Usage

The easiest usecase is to use with [https://github.com/luin/ioredis](ioredis) as follows:

```js
const Redis = require('ioredis');
const redis = new Redis();
require('redis-mdel').install(redis);
```

Additionally, the necessary information is exported:

```js
const Redis = require('ioredis');
const { name, lua, numberOfKeys } = require('mdel');
const redis = new Redis();
redis.defineCommand(name, { lua, numberOfKeys });
```

Then, just run like any other command:

```js
redis.mdel('foo:*');
```

## Tests

There are unit tests and integration tests. Needs Node 6+ to run. The integration tests require redis to be installed.

```bash
npm test
```

## License

See the [LICENSE](LICENSE.md) file for license rights and limitations (MIT).

[build-badge]: https://img.shields.io/travis/perrin4869/redis-mdel/master.svg?style=flat-square
[build]: https://travis-ci.org/perrin4869/redis-mdel

[npm-badge]: https://img.shields.io/npm/v/redis-mdel.svg?style=flat-square
[npm]: https://www.npmjs.org/package/redis-mdel

[coveralls-badge]: https://img.shields.io/coveralls/perrin4869/redis-mdel/master.svg?style=flat-square
[coveralls]: https://coveralls.io/r/perrin4869/redis-mdel

[dependency-status-badge]: https://david-dm.org/perrin4869/redis-mdel.svg?style=flat-square
[dependency-status]: https://david-dm.org/perrin4869/redis-mdel

[dev-dependency-status-badge]: https://david-dm.org/perrin4869/redis-mdel/dev-status.svg?style=flat-square
[dev-dependency-status]: https://david-dm.org/perrin4869/redis-mdel#info=devDependencies
