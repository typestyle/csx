import * as assert from 'assert'
import { rgb, cyan, rgba, hsl, hsla } from '../../src/index'

describe('invert()', () => {
    it('inverts rgb', () => {
        const color1 = rgb(255, 0, 0)
            .invert()
            .toString()
        const color2 = cyan.toString()
        assert.equal(color1, color2)
    })

    it('inverts rgba', () => {
        const color1 = rgba(255, 0, 0, 0.5)
            .invert()
            .toString()
        const color2 = cyan.fade(0.5).toString()
        assert.equal(color1, color2)
    })

    it('inverts hsl', () => {
        const color1 = hsl(0, 1, 0.5)
            .invert()
            .toString()
        const color2 = cyan.toHSL().toString()
        assert.equal(color1, color2)
    })

    it('inverts hsla', () => {
        const color1 = hsla(0, 1, 0.5, 1)
            .invert()
            .toString()
        const color2 = cyan.toHSLA().toString()
        assert.equal(color1, color2)
    })
})
