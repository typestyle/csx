import * as assert from 'assert'
import { red, rgb, green, blue, white, black } from '../../src/index'

describe('grayscale()', () => {
    it('handles red', () => {
        const color1 = red.grayscale().toHSL()
        assert.equal(color1.hue(), 0)
        assert.equal(color1.saturation(), 0)
        assert.equal(Math.round(color1.lightness() * 100), 50)
    })

    it('handles green', () => {
        const color1 = green.grayscale().toHSL()
        assert.equal(color1.hue(), 0)
        assert.equal(color1.saturation(), 0)
        assert.equal(Math.round(color1.lightness() * 100), 25)
    })

    it('handles blue', () => {
        const color1 = blue.grayscale().toHSL()
        assert.equal(color1.hue(), 0)
        assert.equal(color1.saturation(), 0)
        assert.equal(Math.round(color1.lightness() * 100), 50)
    })

    it('handles white', () => {
        const color1 = white.grayscale().toString()
        const color2 = white.toString()
        assert.equal(color1, color2)
    })

    it('handles black', () => {
        const color1 = black.grayscale().toString()
        const color2 = rgb(0, 0, 0).toString()
        assert.equal(color1, color2)
    })
})
