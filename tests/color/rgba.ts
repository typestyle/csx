import * as assert from 'assert'
import { rgba } from '../../src/index'

describe('rgba()', () => {
    it('handles rgba with numbers', () => {
        const color = rgba(255, 0, 0, 1).toString()
        assert.equal(color, 'rgba(255,0,0,1)')
    })

    it('handles rgba with percent string', () => {
        const color = rgba(255, 0, 0, '80%').toString()
        assert.equal(color, 'rgba(255,0,0,0.8)')
    })
    it('rounds channels to the nearest integer', () => {
        const color = rgba(100.5, 100.3, -1, 0.5).toString()
        assert.equal(color, 'rgba(101,100,0,0.5)')
    })
})
