import * as assert from 'assert'
import { red, rgb, rgba, hsl, hsla } from '../../src/index'

describe('toRGB()', () => {
    it('converts from a named color to rgba', () => {
        const color1 = red.toRGBA().toString()
        const color2 = rgba(255, 0, 0, 1).toString()
        assert.equal(color1, color2)
    })

    it('converts from hsl to rgb', () => {
        const color1 = hsl(0, 1, 0.5)
            .toRGB()
            .toString()
        const color2 = rgb(255, 0, 0).toString()
        assert.equal(color1, color2)
    })

    it('converts from hsla to rgb', () => {
        const color1 = hsla(0, 1, 0.5, 0.5)
            .toRGB()
            .toString()
        const color2 = rgb(255, 0, 0).toString()
        assert.equal(color1, color2)
    })
})
