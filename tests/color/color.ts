import * as assert from 'assert';
import {
  color, hsl, hsla, rgb, rgba, cyan, red, white,
  black, green, blue, purple, transparent, maroon
} from '../../src/index';


describe('color()', () => {
  it('converts from a named color to rgb', () => {
    const color1 = red.toString();
    const color2 = rgb(255, 0, 0).toString();
    assert.equal(color1, color2);
  });
  
  it('converts from a hex color (3 digit) to rgb', () => {
    const color1 = color('#FF0000').toString();
    const color2 = rgb(255, 0, 0).toString();
    assert.equal(color1, color2);
  });

  it('converts from a hex color (6 digit) to rgb', () => {
    const color1 = color('#F00').toString();
    const color2 = rgb(255, 0, 0).toString();
    assert.equal(color1, color2);
  });

  it('converts from a rgb color', () => {
    const color1 = color('rgb(255,0,0)').toString();
    const color2 = rgb(255, 0, 0).toString();
    assert.equal(color1, color2);
  });

  it('converts from a rgba color', () => {
    const color1 = color('rgba(0,0,255,.1)').toString();
    const color2 = rgba(0, 0, 255, .1).toString();
    assert.equal(color1, color2);
  });

  it('converts from a hsl color', () => {
    const color1 = color('hsl(345,100%,5%)').toString();
    const color2 = hsl(345, 1, .05).toString();
    assert.equal(color1, color2);
  });

  it('converts from a hsla color', () => {
    const color1 = color('hsla(10, 10%, 60%, .85)').toString();
    const color2 = hsla(10, .1, .6, .85).toString();
    assert.equal(color1, color2);
  });
});
 