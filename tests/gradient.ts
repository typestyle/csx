import { linearGradient, repeatingLinearGradient} from '../src/gradient';
import { hsl } from '../src/color';
import * as assert from 'assert';

describe("csx/gradient", () => {
  it("linear-gradient should resolve", () => {
    const redBlue = linearGradient('top left', 'red', 'blue');
    assert.equal(redBlue, 'linear-gradient(top left, red, blue)');
  });

  it("linear-gradient should resolve colors inside of it", () => {
    const gradient = linearGradient('top left', hsl(0, '100%', '50%'), ['blue', '40%']);
    assert.equal(gradient, 'linear-gradient(top left, hsl(0, 100%, 50%), blue 40%)');
  });

  it("repeating-linear-gradient should resolve", () => {
    const redBlue = repeatingLinearGradient('top left', 'red', 'blue');
    assert.equal(redBlue, 'repeating-linear-gradient(top left, red, blue)');
  });
})
