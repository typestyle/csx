import * as assert from 'assert'
import { hsl } from '../../src/index'

describe('hsl()', () => {
    it('handles negative hues', () => {
        const color1 = hsl(-180, 1, 0.5).toString()
        const color2 = hsl(180, 1, 0.5).toString()
        assert.equal(color1, color2)
    })

    it('handles out of range hues', () => {
        const color1 = hsl(90, 1, 0.5).toString()
        const color2 = hsl(360 + 90, 1, 0.5).toString()
        const color3 = hsl(-360 - 270, 1, 0.5).toString()
        assert.equal(color1, color2)
        assert.equal(color1, color3)
    })

    it('handles hsl with percent strings', () => {
        const color = hsl(0, '100%', '50%').toString()
        assert.equal(color, 'hsl(0,100%,50%)')
    })

    it('handles hsl with percent numbers', () => {
        const color = hsl(0, 1, 0.5).toString()
        assert.equal(color, 'hsl(0,100%,50%)')
    })
    it('rounds hue to the nearest integer', () => {
        const color = hsl(100.5, 0.5, 0.5).toString()
        assert.equal(color, 'hsl(101,50%,50%)')
    })
})
