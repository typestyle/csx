import * as assert from 'assert'
import { hsl } from '../../src/index'

describe('saturate()', () => {
    it('changes white to midred', () => {
        const color1 = hsl(0, 0, 1)
            .saturate(0.5)
            .toString()
        const color2 = hsl(0, 0.5, 1).toString()
        assert.equal(color1, color2)
    })

    it('changes white to red', () => {
        const color1 = hsl(0, 0, 1)
            .saturate(1)
            .toString()
        const color2 = hsl(0, 1, 1).toString()
        assert.equal(color1, color2)
    })
    it('saturates from the absolute max', () => {
        const color1 = hsl(25, 0.2, 0.5)
            .saturate(0.3)
            .toString()
        const color2 = hsl(25, 0.5, 0.5).toString()
        assert.equal(color1, color2)
    })

    it('saturates from the current color', () => {
        const color1 = hsl(25, 0.2, 0.5)
            .saturate(0.3, true)
            .toString()
        const color2 = hsl(25, 0.44, 0.5).toString()
        assert.equal(color1, color2)
    })
})
