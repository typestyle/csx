import * as assert from 'assert'
import { white, black, red, green, blue, rgb, color } from '../../src/index'

describe('toHexString()', () => {
    it('converts white to #FFFFFF', () => {
        const color = white.toHexString()
        assert.equal(color, '#FFFFFF')
    })
    it('converts black to #000000', () => {
        const color = black.toHexString()
        assert.equal(color, '#000000')
    })
    it('converts red to #FF0000', () => {
        const color = red.toHexString()
        assert.equal(color, '#FF0000')
    })
    it('converts green to #008000', () => {
        const color = green.toHexString()
        assert.equal(color, '#008000')
    })
    it('converts blue to #0000FF', () => {
        const color = blue.toHexString()
        assert.equal(color, '#0000FF')
    })
    it('converts rgb(0, 127.5, 0) to #009900', () => {
        const color = rgb(0, 127.5, 0).toHexString()
        assert.equal(color, '#008000')
    })

    it('converts to a # and a six digit hex code', () => {
        const c = color('#16A085')
            .darken('10%')
            .toHexString()
        assert.equal(c.length, 7)
    })
})
