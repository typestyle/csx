import * as assert from 'assert'
import { red, rgba, transparent } from '../../src/index'

describe('toString()', () => {
    it('handles named colors', () => {
        const c1 = red.toString()
        assert.equal(c1, 'rgb(255,0,0)')
    })

    it('handles transparency', () => {
        const c1 = transparent.toString()
        assert.equal(c1, 'rgba(0,0,0,0)')
    })

    it('truncates alpha channel values to the 5th decimal', () => {
        const c1 = rgba(255, 242, 216, 0.49)
        assert.equal(c1.toString(), 'rgba(255,242,216,0.49)')
    })

    it('truncates alpha channel repeating values to the 5th decimal', () => {
        const c1 = rgba(255, 242, 216, 1 / 3)
        assert.equal(c1.toString(), 'rgba(255,242,216,0.33333)')
    })
})
