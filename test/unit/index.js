const { join } = require('path');
const { expect } = require('chai');
const { readFileSync } = require('fs');

const { name, lua, numberOfKeys } = require('../..');

const pdel = readFileSync(join(__dirname, '..', '..', 'src', 'pdel.lua'), 'utf8');

describe('unit', () => {
  it('should export correct object literal', () => {
    expect(name).to.equal('pdel');
    expect(lua).to.equal(pdel);
    expect(numberOfKeys).to.equal(1);
  });
});
