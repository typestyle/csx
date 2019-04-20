import * as csx from '../src/padding';
import * as assert from 'assert';

describe('padding()', () => {
    it('handles all sides', () => {
        const value = csx.padding(1);
        assert.equal(value, '1px');
    });
    it('handles topbottom rightleft', () => {
        const value = csx.padding(1, 2);
        assert.equal(value, '1px 2px');
    });
    it('handles top rightleft bottom', () => {
        const value = csx.padding(1, 2, '3%');
        assert.equal(value, '1px 2px 3%');
    });
    it('handles top right left bottom', () => {
        const value = csx.padding(1, 2, 3, 4);
        assert.equal(value, '1px 2px 3px 4px');
    });
});
