import * as assert from 'assert'
import { rgb, rgba } from '../../src/index'

describe('green()', () => {
    it('returns the green channel from rgb', () => {
        const color1 = rgb(0, 255, 0)
        assert.equal(255, color1.green())
    })

    it('returns the green channel from rgba', () => {
        const color1 = rgba(0, 255, 0, 0.5)
        assert.equal(255, color1.green())
    })
})
