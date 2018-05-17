import { em, percent, px, rad, rem, turn, viewHeight, viewWidth } from '../src/index';
import * as assert from 'assert';

describe("csx/em", () => {
    it("converts a number to number+em", () => {
        assert.equal(em(5), '5em');
    });
});

describe("csx/percent", () => {
    it("converts a number to number+%", () => {
        assert.equal(percent(5), '5%');
    });
});

describe("csx/px", () => {
    it("converts a number to number+px", () => {
        assert.equal(px(5), '5px');
    });
});

describe("csx/rad", () => {
    it("converts a number to number+rad", () => {
        assert.equal(rad(20), '20rad');
    });
});

describe("csx/rem", () => {
    it("converts a number to number+rem", () => {
        assert.equal(rem(5), '5rem');
    });
});

describe("csx/viewHeight", () => {
    it("converts a number to number+vh", () => {
        assert.equal(viewHeight(5), '5vh');
    });
});

describe("csx/viewWidth", () => {
    it("converts a number to number+vw", () => {
        assert.equal(viewWidth(5), '5vw');
    });
});

describe("csx/turn", () => {
    it("converts a number to number+turn", () => {
        assert.equal(turn(1), '1turn');
    });
});
