import Redis from 'ioredis';
import { expect } from 'chai';
import { install as mdel } from '../../lib';

module.exports = () => {
  describe('integration', () => {
    const keyPrefix = 'mdel:test:';
    const redis = new Redis({ keyPrefix });
    mdel(redis);

    beforeEach(async function() {
      const keys = await redis
        .multi()
        .mdel('foo:*')
        .mdel('bar:*')
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

      await redis.mdel('foo:*');

      expect(await redis.mget([
        'foo:1',
        'foo:2',
        'bar:1',
        'bar:2',
      ])).to.deep.equal([null, null, 'val', 'val']);
    });
  });
};
