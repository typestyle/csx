import { em, percent, px, rem, viewHeight, viewWidth } from '../index';
import * as assert from 'assert';

describe("csx/em", () => {
    it("converts a number to number+prefix", () => {
        assert.equal(em(5), '5em');
    });
});

describe("csx/percent", () => {
    it("converts a number to number+prefix", () => {
        assert.equal(percent(5), '5%');
    });
});

describe("csx/px", () => {
    it("converts a number to number+prefix", () => {
        assert.equal(px(5), '5px');
    });
});

describe("csx/rem", () => {
    it("converts a number to number+prefix", () => {
        assert.equal(rem(5), '5rem');
    });
});

describe("csx/viewHeight", () => {
    it("converts a number to number+prefix", () => {
        assert.equal(viewHeight(5), '5vh');
    });
});

describe("csx/viewWidth", () => {
    it("converts a number to number+prefix", () => {
        assert.equal(viewWidth(5), '5vw');
    });
});
