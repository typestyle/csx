import * as assert from 'assert'
import { rgb } from '../../src/index'

describe('rgb()', () => {
    it('handles rgb with numbers', () => {
        const color = rgb(255, 0, 0).toString()
        assert.equal(color, 'rgb(255,0,0)')
    })

    it('rounds channels to the nearest integer', () => {
        const color = rgb(100.5, 100.3, -1).toString()
        assert.equal(color, 'rgb(101,100,0)')
    })
})
