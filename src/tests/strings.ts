import * as csx from '../index';
import * as assert from 'assert';

describe("csx/quote", () => {
    it("quotes ' correctly", () => {
        const contraction = csx.quote("it's is a contraction");
        assert.equal(contraction, `'it\'s is a contraction'`);
    });

    it("quotes \" correctly", () => {
        const title = csx.quote(`A title "Should be in Quotes"`);
        assert.equal(title, `'A title \"Should be in Quotes\"'`);
    });
    
    it("quotes around the string", () => {
        const title = csx.quote(`Hello, World!`);
        assert.equal(title, `'Hello, World!'`);
    });
});

describe("csx/important", () => {
    it("converts numbers to ${number} !important", () => {
        const numberToString = csx.important(42);
        assert.equal(numberToString, '42 !important');
    });

    it("converts strings to ${string} !important", () => {
        const str = csx.important('red');
        assert.equal(str, 'red !important');
    });

    it("wraps helpers instead of calling them directly", () => {
        const importantColor = csx.important(csx.rgb(255, 0, 0));
        assert.equal(importantColor.type, 'color');

        const colorValue = importantColor.toString();
        assert.equal(colorValue, 'rgb(255,0,0) !important');
    });
});
