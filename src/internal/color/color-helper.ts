import { CSSColor } from 'typestyle/lib/types'

import { formatPercent, cssFunction, formatFloat, roundFloat, toHex } from '../../utils'
import { HSL, RGB, R, G, B, H, S, L, A } from './constants'
import { clampColor } from './clamp-color'
import { red } from './names'

export class ColorHelper {
    public isAlpha: boolean
    public channels: number[]
    public type: number

    constructor(format: number, c0: number, c1: number, c2: number, c3: number, hasAlpha: boolean) {
        this.type = format
        this.isAlpha = hasAlpha
        this.channels = [
            clampColor(format, 0, c0),
            clampColor(format, 1, c1),
            clampColor(format, 2, c2),
            clampColor(format, 3, c3)
        ]
    }

    /**
    * Converts to hex; rgb(255, 255, 255) to #FFFFFF
    */
    public toHexString(): CSSColor {
        const v = this.toRGB().channels
        return '#' + (toHex(v[R]) + toHex(v[G]) + toHex(v[B])).toUpperCase()
    }

    /**
     * Converts the stored color into string form (which is used by Free Style)
     */
    public toString(): CSSColor {
        const format = this.type
        const v = this.channels
        const hasAlpha = this.isAlpha

        let fnName: string
        let params: (number | string)[]

        // find function name and resolve first three channels
        if (format === RGB) {
            fnName = hasAlpha ? 'rgba' : 'rgb'
            params = [Math.round(v[R]), Math.round(v[G]), Math.round(v[B])]
        } else if (format === HSL) {
            fnName = hasAlpha ? 'hsla' : 'hsl'
            params = [Math.round(v[H]), formatPercent(roundFloat(v[S], 100)), formatPercent(roundFloat(v[L], 100))]
        } else {
            throw new Error('Invalid color format')
        }

        // add alpha channel if needed
        if (hasAlpha) {
            params.push(formatFloat(roundFloat(v[A], 100000)))
        }

        // return as a string
        return cssFunction(fnName, params)
    }

    /**
     * Converts to the Hue, Saturation, Lightness color space
     */
    public toHSL() {
        return convert(this, HSL, false)
    }

    /**
     * Converts to the Hue, Saturation, Lightness color space and adds an alpha channel
     */
    public toHSLA() {
        return convert(this, HSL, true)
    }

    /**
     * Converts to the Red, Green, Blue color space
     */
    public toRGB() {
        return convert(this, RGB, false)
    }

    /**
     * Converts to the Red, Green, Blue color space and adds an alpha channel
     */
    public toRGBA() {
        return convert(this, RGB, true)
    }

    /**
     * Returns the current level of red
     */
    public red(): number {
        return this.toRGB().channels[R]
    }

    /**
     * Returns the current level of green
     */
    public green(): number {
        return this.toRGB().channels[G]
    }

    /**
     * Returns the current level of blue
     */
    public blue(): number {
        return this.toRGB().channels[B]
    }

    /**
     * Returns the current hue
     */
    public hue(): number {
        return this.toHSL().channels[H]
    }

    /**
     * Returns the saturation
     */
    public saturation(): number {
        return this.toHSL().channels[S]
    }

    /**
     * Returns the current lightness
     */
    public lightness(): number {
        return this.toHSL().channels[L]
    }
    /**
     * Returns the current value of the alpha channel
     */
    public alpha(): number {
        return this.channels[A]
    }

    /**
     * Returns the current value of the alpha channel
     */
    public opacity(): number {
        return this.channels[A]
    }
}

/**
 * Map of Color converters.  By subtracting the from-format from the to-format, we can
 * quickly map to the right converter. 1-2 and 2-1 yield different results, so this
 * allows us to choose the right converter observing the direction correcly
 */
const converters = {
    [RGB - HSL]: RGBtoHSL,
    [HSL - RGB]: HSLtoRGB
}

export const parsers: { (colorString: string): ColorHelper | undefined }[] = [];

/**
 * Creates a color from a hex color code or named color.
 * e.g. color('red') or color('#FF0000') or color('#F00'))
 */
export function color(value: string | ColorHelper): ColorHelper {
    if (value instanceof ColorHelper) {
        return value as ColorHelper
    }
    
    let colorHelper: ColorHelper | undefined;
    for (let i = 0, ilen = parsers.length; i < ilen; i++) {
        colorHelper = parsers[i](value);
        if (colorHelper) {
            return colorHelper;
        }
    }
    
    return red!
}

/**
 * Converts from one format to another format
 */
export function convert(self: ColorHelper, toType: number, hasAlpha: boolean): ColorHelper {
    const type = self.type
    const v = self.channels 
    
    if (type !== toType) {
        // if types are not the same convert
        return converters[type - toType](v[R], v[G], v[B], v[A], hasAlpha)
    }
    if (hasAlpha !== self.isAlpha) {
        // if types are same but alpha is not, create a new color
        return new ColorHelper(type, v[R], v[G], v[B], v[A], hasAlpha)
    }
    
    // else return the same instance, nothing has changed
    return self
}


function RGBtoHSL(c0: number, c1: number, c2: number, c3: number, hasAlpha: boolean): ColorHelper {
    const r = c0 / 255
    const g = c1 / 255
    const b = c2 / 255
    const min = Math.min(r, g, b)
    const max = Math.max(r, g, b)
    const l = (min + max) / 2
    const delta = max - min

    let h: number
    if (max === min) {
        h = 0
    } else if (r === max) {
        h = (g - b) / delta
    } else if (g === max) {
        h = 2 + (b - r) / delta
    } else if (b === max) {
        h = 4 + (r - g) / delta
    } else {
        h = 0
    }

    h = Math.min(h * 60, 360)

    if (h < 0) {
        h += 360
    }

    let s: number
    if (max === min) {
        s = 0
    } else if (l <= 0.5) {
        s = delta / (max + min)
    } else {
        s = delta / (2 - max - min)
    }

    return new ColorHelper(HSL, h, s, l, c3, hasAlpha)
}

function HSLtoRGB(c0: number, c1: number, c2: number, c3: number, hasAlpha: boolean): ColorHelper {
    const h = c0 / 360
    const s = c1
    const l = c2

    if (s === 0) {
        const val = l * 255
        return new ColorHelper(RGB, val, val, val, c3, hasAlpha)
    }

    const t2 = l < 0.5 ? l * (1 + s) : l + s - l * s
    const t1 = 2 * l - t2

    let r = 0,
        g = 0,
        b = 0
    for (let i = 0; i < 3; i++) {
        let t3 = h + 1 / 3 * -(i - 1)
        if (t3 < 0) {
            t3++
        }
        if (t3 > 1) {
            t3--
        }

        let val: number
        if (6 * t3 < 1) {
            val = t1 + (t2 - t1) * 6 * t3
        } else if (2 * t3 < 1) {
            val = t2
        } else if (3 * t3 < 2) {
            val = t1 + (t2 - t1) * (2 / 3 - t3) * 6
        } else {
            val = t1
        }
        val *= 255

        // manually set variables instead of using an array
        if (i === 0) {
            r = val
        } else if (i === 1) {
            g = val
        } else {
            b = val
        }
    }

    return new ColorHelper(RGB, r, g, b, c3, hasAlpha)
}
