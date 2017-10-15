import * as assert from 'assert'
import { red } from '../../src/index'

describe('spin()', () => {
    it('spinning 360 degrees returns same color', () => {
        const color1 = red.toString()
        const color2 = red.spin(360).toString()
        assert.equal(color1, color2)
    })

    it('spinning -360 degrees returns same color', () => {
        const color1 = red.toString()
        const color2 = red.spin(-360).toString()
        assert.equal(color1, color2)
    })

    it('spinning -120 degrees from red returns blue', () => {
        const color1 = red.spin(-120).toHexString()
        assert.equal('#0000FF', color1)
    })

    it('spinning 120 degrees from red returns yellow', () => {
        const color1 = red.spin(120).toHexString()
        assert.equal('#00FF00', color1)
    })
})
