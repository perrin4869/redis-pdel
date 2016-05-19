const unit = require('./unit');
const integration = require('./integration');

describe('redis-pdel', () => {
  unit();
  integration();
});
