import Redis from 'ioredis';
import { expect } from 'chai';
import { install as pdel } from '../../lib';

module.exports = () => {
  describe('integration', () => {
    const keyPrefix = 'pdel:test:';
    const redis = new Redis({ keyPrefix });
    pdel(redis);

    beforeEach(async function() {
      const keys = await redis
        .multi()
        .pdel('foo:*')
        .pdel('bar:*')
        .keys(`${keyPrefix}foo:*`)
        .keys(`${keyPrefix}bar:*`)
        .exec();

      expect(keys[2][1].length).to.equal(0);
      expect(keys[3][1].length).to.equal(0);
    });

    after(async function() {
      await redis.disconnect();
    });

    it('should delete foo keys but not bar keys', async function() {
      await Promise.all([
        redis.set('foo:1', 'val'),
        redis.set('foo:2', 'val'),
        redis.set('bar:1', 'val'),
        redis.set('bar:2', 'val'),
      ]);

      await redis.pdel('foo:*');

      expect(await redis.mget([
        'foo:1',
        'foo:2',
        'bar:1',
        'bar:2',
      ])).to.deep.equal([null, null, 'val', 'val']);
    });
  });
};
