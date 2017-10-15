import * as assert from 'assert'
import { rgba, hsla } from '../../src/index'

describe('toRGBA()', () => {
    it('converts from hsla to rgba', () => {
        const color1 = hsla(0, 1, 0.5, 0.5)
            .toRGBA()
            .toString()
        const color2 = rgba(255, 0, 0, 0.5).toString()
        assert.equal(color1, color2)
    })
})
