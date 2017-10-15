import * as assert from 'assert'
import { red, green, rgb, purple, white, blue, transparent, rgba, maroon, black } from '../../src/index'

describe('mix()', () => {
    // $c0: mix(red, green);
    // $c1: mix(red, blue);
    // $c2: mix(red, white);
    // $c3: mix(red, transparent);
    // $c4: mix(red, black);

    it('red + green', () => {
        // sass converts rgb to hex, so the actual result should be
        // rgb(127.5, 64, 0) if the numbers were preserved
        const color1 = red.mix(green).toString()
        const color2 = rgb(128, 64, 0).toString()
        assert.equal(color1, color2)
    })

    it('red + blue', () => {
        const color1 = red.mix(blue).toString()
        const color2 = purple.toString()
        assert.equal(color1, color2)
    })

    it('red + white', () => {
        const color1 = red.mix(white).toString()
        const color2 = rgb(255, 128, 128).toString()
        assert.equal(color1, color2)
    })

    it('red + transparent', () => {
        const color1 = red.mix(transparent).toString()
        const color2 = rgba(255, 0, 0, 0.5).toString()
        assert.equal(color1, color2)
    })

    it('red + black', () => {
        const color1 = red.mix(black).toString()
        const color2 = maroon.toString()
        assert.equal(color1, color2)
    })
})
