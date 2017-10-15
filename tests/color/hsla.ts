import * as assert from 'assert'
import { hsla } from '../../src/index'

describe('hsla()', () => {
    it('handles hsla with percent numbers', () => {
        const color = hsla(0, 1, 0.5, 0.1).toString()
        assert.equal(color, 'hsla(0,100%,50%,0.1)')
    })

    it('handles hsla with percent strings', () => {
        const color = hsla(0, '100%', '50%', 0.1).toString()
        assert.equal(color, 'hsla(0,100%,50%,0.1)')
    })

    it('rounds hue to the nearest integer', () => {
        const color = hsla(100.5, 0.5, 0.5, 0).toString()
        assert.equal(color, 'hsla(101,50%,50%,0)')
    })
})
