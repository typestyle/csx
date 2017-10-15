import * as assert from 'assert'
import { black, white, rgb, hsl } from '../../src/index'

describe('lighten()', () => {
    it('lightens black to white', () => {
        const color1 = black.lighten(1).toString()
        const color2 = white.toString()
        assert.equal(color1, color2)
    })
    it('lightens black to gray', () => {
        const color1 = black.lighten(0.5).toString()
        const color2 = rgb(128, 128, 128).toString()
        assert.equal(color1, color2)
    })
    it('lightens from the absolute max', () => {
        const color1 = hsl(25, 1, 0.2)
            .lighten(0.3)
            .toString()
        const color2 = hsl(25, 1, 0.5).toString()
        assert.equal(color1, color2)
    })
    it('lightens from the current color', () => {
        const color1 = hsl(25, 1, 0.2).lighten(0.3, true)
        const color2 = hsl(25, 1, 0.44)
        assert.equal(color1.lightness(), color2.lightness())
    })
})
