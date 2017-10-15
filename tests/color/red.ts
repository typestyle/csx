import * as assert from 'assert'
import { rgb, rgba } from '../../src/index'

describe('red()', () => {
    it('returns the red channel from rgb', () => {
        const color1 = rgb(255, 0, 0)
        assert.equal(255, color1.red())
    })

    it('returns the red channel from rgba', () => {
        const color1 = rgba(255, 0, 0, 0.5)
        assert.equal(255, color1.red())
    })
})
