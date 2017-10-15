import * as assert from 'assert'
import { rgba } from '../../src/index'

describe('fadeIn', () => {
    it('.25 = 0 - .25', () => {
        const color1 = rgba(255, 0, 0, 0)
            .fadeIn(0.25)
            .toString()
        const color2 = rgba(255, 0, 0, 0.25).toString()
        assert.equal(color1, color2)
    })

    it('.5 = .25 - .25', () => {
        const color1 = rgba(255, 0, 0, 0.25)
            .fadeIn(0.25)
            .toString()
        const color2 = rgba(255, 0, 0, 0.5).toString()
        assert.equal(color1, color2)
    })

    it('.75 = .5 - .25', () => {
        const color1 = rgba(255, 0, 0, 0.5)
            .fadeIn(0.25)
            .toString()
        const color2 = rgba(255, 0, 0, 0.75).toString()
        assert.equal(color1, color2)
    })

    it('1 = .75 - .25', () => {
        const color1 = rgba(255, 0, 0, 0.75)
            .fadeIn(0.25)
            .toString()
        const color2 = rgba(255, 0, 0, 1).toString()
        assert.equal(color1, color2)
    })

    it('clamps at 100%', () => {
        const color1 = rgba(255, 0, 0, 1)
            .fadeIn(0.25)
            .toString()
        const color2 = rgba(255, 0, 0, 1).toString()
        assert.equal(color1, color2)
    })

    it('fades in from the absolute max', () => {
        const color1 = rgba(255, 0, 0, 0.2)
            .fadeIn(0.3)
            .toString()
        const color2 = rgba(255, 0, 0, 0.5).toString()
        assert.equal(color1, color2)
    })

    it('fades in from the current opacity', () => {
        const color1 = rgba(255, 0, 0, 0.2).fadeIn(0.3, true)
        const color2 = rgba(255, 0, 0, 0.44)
        assert.equal(color1.lightness(), color2.lightness())
    })
})
