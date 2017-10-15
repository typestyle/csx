import * as assert from 'assert'
import { red, hsla, rgb, rgba } from '../../src/index'

describe('toHSLA()', () => {
    it('converts from a named color to hsla', () => {
        const color1 = red.toHSLA().toString()
        const color2 = hsla(0, 1, 0.5, 1).toString()
        assert.equal(color1, color2)
    })

    it('converts from rgb to hsla', () => {
        const color1 = rgb(255, 0, 0)
            .toHSLA()
            .toString()
        const color2 = hsla(0, 1, 0.5, 1).toString()
        assert.equal(color1, color2)
    })

    it('converts from rgba to hsla', () => {
        const color1 = rgba(255, 0, 0, 0.5)
            .toHSLA()
            .toString()
        const color2 = hsla(0, 1, 0.5, 0.5).toString()
        assert.equal(color1, color2)
    })
})
