import * as assert from 'assert'
import { rgb, rgba } from '../../src/index'

describe('blue()', () => {
    it('returns the blue channel from rgb', () => {
        const color1 = rgb(0, 0, 255)
        assert.equal(255, color1.blue())
    })
    it('returns the blue channel from rgba', () => {
        const color1 = rgba(0, 0, 255, 0.5)
        assert.equal(255, color1.blue())
    })
})
