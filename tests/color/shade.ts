import * as assert from 'assert'
import { red, rgb } from '../../src/index'

describe('shade()', () => {
    it('changed red to a darker red', () => {
        const color1 = red.shade(0.3).toString()
        // color2 was tested on the SASS compiler with mix(black, red, 30%)
        const color2 = rgb(179, 0, 0).toString()
        assert.equal(color1, color2)
    })
})
