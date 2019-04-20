import { background } from "../src/background";
import * as assert from 'assert';

describe("csx/background", () => {
  it("returns empty string when no backgrounds are supplied", () => {
    const empty = background();
    assert.equal(empty, '');
  });

  it("returns empty string when no background properties are supplied", () => {
    const empty = background({});
    assert.equal(empty, '');
  });

  it("returns empty string when multiple arguments without background properties are supplied", () => {
    const empty = background({}, {});
    assert.equal(empty, '');
  });

  it("returns valid background shorthand for few properties", () => {
    const bkg = background({
        color: 'green',
        image: 'url("test.jpg")',
        repeat: 'repeat-y'
    });
    assert.equal(bkg, 'url("test.jpg") repeat-y green');
  });

  it("returns valid background shorthand for all properties", () => {
    const bkg = background({
        image: 'url("test.jpg")',
        position: 'center',
        size: '50% auto',
        repeat: 'repeat-x',
        origin: 'padding-box',
        clip: 'text',
        attachment: 'fixed',
        color: 'red'
    });
    assert.equal(bkg, 'url("test.jpg") center/50% auto repeat-x padding-box text fixed red');
  });

  it("returns valid background shorthand for multiple backgrounds", () => {
    const bkg = background(
        {
            image: 'url("test.jpg")',
            position: 'center',
            size: '50% auto',
            repeat: 'repeat-x',
            origin: 'padding-box',
            clip: 'text',
            attachment: 'fixed',
            color: 'red'
        },
        {
            color: 'green',
            image: 'url("test.jpg")',
            repeat: 'repeat-y'
        });
    assert.equal(bkg, 'url("test.jpg") center/50% auto repeat-x padding-box text fixed red, url("test.jpg") repeat-y green');
  });

  it("returns valid background shorthand for more than two backgrounds", () => {
    const bkg = background(
        { color: 'red' },
        { color: 'yellow' },
        { color: 'green' }
    );
    assert.equal(bkg, 'red, yellow, green');
  });
});
