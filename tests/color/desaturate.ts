import * as assert from 'assert'
import { hsl, red, rgb } from '../../src/index'

describe('desaturate()', () => {
    it('changes red to midred', () => {
        const color1 = hsl(0, 1, 1)
            .desaturate(0.5)
            .toString()
        const color2 = hsl(0, 0.5, 1).toString()
        assert.equal(color1, color2)
    })

    it('changes red to white', () => {
        const color1 = red.desaturate(1).toString()
        const color2 = rgb(128, 128, 128).toString()
        assert.equal(color1, color2)
    })

    it('desaturates from the absolute max', () => {
        const color1 = hsl(25, 0.8, 0.5)
            .desaturate(0.3)
            .toString()
        const color2 = hsl(25, 0.5, 0.5).toString()
        assert.equal(color1, color2)
    })

    it('desaturates from the current color', () => {
        const color1 = hsl(25, 0.8, 0.5)
            .desaturate(0.3, true)
            .toString()
        const color2 = hsl(25, 0.56, 0.5).toString()
        assert.equal(color1, color2)
    })
})
