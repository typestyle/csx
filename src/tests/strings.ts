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
})
