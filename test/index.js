const unit = require('./unit');
const integration = require('./integration');

describe('redis-mdel', () => {
  unit();
  integration();
});
