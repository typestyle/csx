import * as assert from 'assert'
import { rgb, rgba } from '../../src/index'

describe('opacity()', () => {
    it('returns the alpha channel from rgb', () => {
        const color1 = rgb(0, 0, 0)
        assert.equal(1, color1.alpha())
        assert.equal(1, color1.opacity())
    })

    it('returns the alpha channel from rgba', () => {
        const color1 = rgba(0, 0, 0, 0.5)
        assert.equal(0.5, color1.alpha())
        assert.equal(0.5, color1.opacity())
    })
})
