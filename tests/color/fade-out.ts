import * as assert from 'assert'
import { rgba } from '../../src/index'

describe('fadeOut', () => {
    it('clamps at 0%', () => {
        const color1 = rgba(255, 0, 0, 0)
            .fadeOut(0.25)
            .toString()
        const color2 = rgba(255, 0, 0, 0).toString()
        assert.equal(color1, color2)
    })

    it('.75 = 1 - .25', () => {
        const color1 = rgba(255, 0, 0, 1)
            .fadeOut(0.25)
            .toString()
        const color2 = rgba(255, 0, 0, 0.75).toString()
        assert.equal(color1, color2)
    })

    it('.5 = .75 - .25', () => {
        const color1 = rgba(255, 0, 0, 0.75)
            .fadeOut(0.25)
            .toString()
        const color2 = rgba(255, 0, 0, 0.5).toString()
        assert.equal(color1, color2)
    })

    it('.25 = .5 - .25', () => {
        const color1 = rgba(255, 0, 0, 0.5)
            .fadeOut(0.25)
            .toString()
        const color2 = rgba(255, 0, 0, 0.25).toString()
        assert.equal(color1, color2)
    })

    it('0 = .25 - .25', () => {
        const color1 = rgba(255, 0, 0, 0.25)
            .fadeOut(0.25)
            .toString()
        const color2 = rgba(255, 0, 0, 0).toString()
        assert.equal(color1, color2)
    })

    it('fades out from the absolute max', () => {
        const color1 = rgba(255, 0, 0, 0.8)
            .fadeOut(0.3)
            .toString()
        const color2 = rgba(255, 0, 0, 0.5).toString()
        assert.equal(color1, color2)
    })

    it('fades out from the current opacity', () => {
        const color1 = rgba(255, 0, 0, 0.8)
            .fadeOut(0.3, true)
            .toString()
        const color2 = rgba(255, 0, 0, 0.56).toString()
        assert.equal(color1, color2)
    })
})
