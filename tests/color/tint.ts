import * as assert from 'assert'
import { red, rgb } from '../../src/index'

describe('tint()', () => {
    it('changed red to a lighter red', () => {
        const color1 = red.tint(0.3).toString()
        // color2 was tested on the SASS compiler with mix(white, red, 30%)
        const color2 = rgb(255, 77, 77).toString()
        assert.equal(color1, color2)
    })
})
