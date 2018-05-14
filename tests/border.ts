import * as csx from '../src/border';
import * as assert from 'assert';

describe('border()', () => {
  it('handles color', () => {
    const value = csx.border({ color: 'red' });
    assert.equal(value, 'red');
  })
  it('handles style', () => {
    const value = csx.border({ style: 'medium' });
    assert.equal(value, 'medium');
  })
  it('handles width', () => {
    const value = csx.border({ width: 2 });
    assert.equal(value, '2px');
  })
  it('handles width as %', () => {
    const value = csx.border({ width: '2%' });
    assert.equal(value, '2%');
  })
  it('handles color + style + width', () => {
    const value = csx.border({
      color: 'red',
      style: 'medium',
      width: 2
    });
    assert.equal(value, 'red medium 2px');
  })
});
describe('borderColor()', () => {
  it('handles all sides', () => {
    const value = csx.borderColor('red');
    assert.equal(value, 'red');
  })
  it('handles topbottom rightleft', () => {
    const value = csx.borderColor('red', 'blue');
    assert.equal(value, 'red blue');
  })
  it('handles top rightleft bottom', () => {
    const value = csx.borderColor('red', 'blue', 'green');
    assert.equal(value, 'red blue green');
  })
  it('handles top right left bottom', () => {
    const value = csx.borderColor('red', 'blue', 'green', 'orange');
    assert.equal(value, 'red blue green orange');
  })
});
describe('borderWidth()', () => {
   it('handles all sides', () => {
    const value = csx.borderWidth(1);
    assert.equal(value, '1px');
  })
  it('handles topbottom rightleft', () => {
    const value = csx.borderWidth(1, 2);
    assert.equal(value, '1px 2px');
  })
  it('handles top rightleft bottom', () => {
    const value = csx.borderWidth(1, 2, '3%');
    assert.equal(value, '1px 2px 3%');
  })
  it('handles top right left bottom', () => {
    const value = csx.borderWidth(1, 2, 3, 4);
    assert.equal(value, '1px 2px 3px 4px');
  });
});
describe('borderStyle()', () => {
    it('handles all sides', () => {
    const value = csx.borderWidth('solid');
    assert.equal(value, 'solid');
  })
  it('handles topbottom rightleft', () => {
    const value = csx.borderWidth('solid', 'solid');
    assert.equal(value, 'solid solid');
  })
});
