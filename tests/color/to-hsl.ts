import * as assert from 'assert'
import { red, rgb, hsl } from '../../src/index'

describe('toHSL()', () => {
    it('converts from a named color to hsl', () => {
        const color1 = red.toHSL().toString()
        const color2 = hsl(0, 1, 0.5).toString()
        assert.equal(color1, color2)
    })

    it('converts from rgb to hsl', () => {
        const color1 = rgb(255, 0, 0)
            .toHSL()
            .toString()
        const color2 = hsl(0, 1, 0.5).toString()
        assert.equal(color1, color2)
    })
})
