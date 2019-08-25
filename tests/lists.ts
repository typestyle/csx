import { list } from '../src/lists';
import { rgb, hsl } from '../src/color';
import { linearGradient } from '../src/gradient';
import * as assert from 'assert';

describe("csx/list", () => {
  it("returns empty when no items", () => {
    const empty = list();
    assert.equal(empty, '');
  });

  it("returns the same item when passed one item", () => {
    const single = list('single');
    assert.equal(single, 'single');
  });

  it("returns a comma delimited list when passed multiple", () => {
    const multiple = list(
      'url(https://site)',
      'local(My Font)'
    );
    assert.equal(multiple, 'url(https://site),local(My Font)');
  });

  it("calls .toString() on other helpers", () => {
    const colorList = list(
      rgb(255, 255, 0),
      hsl(100, .5, .5)
    );
    assert.equal(colorList, 'rgb(255, 255, 0),hsl(100, 50%, 50%)');
  });

  it("removes empty entries", () => {
    const holeyList = list(
      'one',
      undefined as any,
      null as any,
      'four',
      '',
      6
    );
    assert.equal(holeyList, 'one,four,6px');
  });

  it("calls .toString() on other helpers", () => {
    const imageList = list(
      linearGradient('top', 'red', 'blue'),
      linearGradient('bottom', 'blue', 'red')
    );
    assert.equal(imageList, 'linear-gradient(top, red, blue),linear-gradient(bottom, blue, red)');
  });

  it("supports multiple helper types", () => {
    const imageList = list(
      linearGradient('top', 'red', 'blue'),
      rgb(255, 255, 0).toString()
    );
    assert.equal(imageList, 'linear-gradient(top, red, blue),rgb(255, 255, 0)');
  });
});