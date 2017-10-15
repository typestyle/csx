import * as assert from 'assert'
import { rgb, rgba, hsl, hsla } from '../../src/index'

describe('fade()', () => {
    it('changes rgb to rgba', () => {
        const color1 = rgb(255, 255, 255)
            .fade(1)
            .toString()
        const color2 = rgba(255, 255, 255, 1).toString()
        assert.equal(color1, color2)
    })

    it('changes hsl to hsla', () => {
        const color1 = hsl(0, 0, 1)
            .fade(1)
            .toString()
        const color2 = hsla(0, 0, 1, 1).toString()
        assert.equal(color1, color2)
    })

    it('clamps < 0 at 0% opacity', () => {
        const color1 = rgba(255, 0, 0, 0)
            .fade(-0.5)
            .toString()
        const color2 = rgba(255, 0, 0, 0).toString()
        assert.equal(color1, color2)
    })

    it('sets 0 to 0% opacity', () => {
        const color1 = rgba(255, 0, 0, 0)
            .fade(0)
            .toString()
        const color2 = rgba(255, 0, 0, 0).toString()
        assert.equal(color1, color2)
    })

    it('sets .5 to 50% opacity', () => {
        const color1 = rgba(255, 0, 0, 0)
            .fade(0.5)
            .toString()
        const color2 = rgba(255, 0, 0, 0.5).toString()
        assert.equal(color1, color2)
    })

    it('sets 1 to 100% opacity', () => {
        const color1 = rgba(255, 0, 0, 0)
            .fade(1)
            .toString()
        const color2 = rgba(255, 0, 0, 1).toString()
        assert.equal(color1, color2)
    })

    it('clamps > 1 to 100% opacity', () => {
        const color1 = rgba(255, 0, 0, 0)
            .fade(1.5)
            .toString()
        const color2 = rgba(255, 0, 0, 1).toString()
        assert.equal(color1, color2)
    })
})
