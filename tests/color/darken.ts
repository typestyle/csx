import * as assert from 'assert'
import { white, black, hsl, rgb, rgba } from '../../src/index'

describe('darken()', () => {
    it('changes white to black', () => {
        const color1 = white.darken(1).toString()
        const color2 = black.toString()
        assert.equal(color1, color2)
    })

    it('changes white to gray', () => {
        const color1 = white
            .darken(0.5)
            .toHSL()
            .toString()
        
        const color2 = hsl(0, 0, 0.5).toString()
        assert.equal(color1, color2)
    })

    it('keeps the color format it started with', () => {
        const color1 = rgb(255, 0, 0)
            .darken(0.5)
            .toString()
        const color2 = rgb(0, 0, 0).toString()
        assert.equal(color1, color2)
    })

    it('keeps its alpha channel', () => {
        const color1 = rgba(69, 86, 100, '70%').darken(0.3)
        assert.equal(color1.opacity() - 0.7 < 0.0001, true)
    })

    it('darkens from the absolute max', () => {
        const color1 = hsl(25, 1, 0.8)
            .darken(0.3)
            .toString()
        const color2 = hsl(25, 1, 0.5).toString()
        assert.equal(color1, color2)
    })

    it('darkens from the current color', () => {
        const color1 = hsl(25, 1, 0.8)
            .darken(0.3, true)
            .toString()
        const color2 = hsl(25, 1, 0.56).toString()
        assert.equal(color1, color2)
    })
})
