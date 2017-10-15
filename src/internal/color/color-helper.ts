import { HSL, RGB, maxChannelValues, A, H, S, L, R, G, B } from './constants'

export interface ColorHelper {
    type: 'color'
    /**
     * True if the color has an alpha channel
     */
    isAlpha: boolean
    /**
     * Color Space (HSL or RGB)
     */
    s: number
    /**
     * Channel 1 (Hue or Red)
     */
    c1: number
    /**
     * Channel 2 (Saturation or Green)
     */
    c2: number
    /**
     * Channel 3 (Lightness or Blue)
     */
    c3: number
    /**
     * Alpha
     */
    a: number
    /**
     * Converts to the Hue, Saturation, Lightness color space
     */
    toHSL(): ColorHelper
    /**
     * Converts to the Hue, Saturation, Lightness color space and adds an alpha channel
     */
    toHSLA(): ColorHelper
    /**
     * Converts to the Red, Green, Blue color space
     */
    toRGB(): ColorHelper
    /**
     * Converts to the Red, Green, Blue color space and adds an alpha channel
     */
    toRGBA(): ColorHelper
    /**
     * Returns the current level of red
     */
    red(): number
    /**
     * Returns the current level of green
     */
    green(): number
    /**
     * Returns the current level of blue
     */
    blue(): number
    /**
     * Returns the current hue
     */
    hue(): number
    /**
     * Returns the saturation
     */
    saturation(): number
    /**
     * Returns the current lightness
     */
    lightness(): number
    /**
     * Returns the current value of the alpha channel
     */
    alpha(): number
    /**
     * Returns the current value of the alpha channel
     */
    opacity(): number
}

/**
 * Map of Color converters.  By subtracting the from-format from the to-format, we can
 * quickly map to the right converter. 1-2 and 2-1 yield different results, so this
 * allows us to choose the right converter observing the direction correcly
 */
const colorConverters = {
    [RGB - HSL]: RGBtoHSL,
    [HSL - RGB]: HSLtoRGB
}

export const colorParsers: { (colorString: string): ColorHelper | undefined }[] = []

export const colorPrototype = {
    type: 'color',
    isAlpha: false,
    s: 0,
    c1: 0,
    c2: 0,
    c3: 0,
    a: 0,
    toHSL() {
        return convert(this, HSL, false)
    },
    toHSLA() {
        return convert(this, HSL, true)
    },
    toRGB() {
        return convert(this, RGB, false)
    },
    toRGBA() {
        return convert(this, RGB, true)
    },
    red(): number {
        return this.toRGB().c1
    },
    green(): number {
        return this.toRGB().c2
    },
    blue(): number {
        return this.toRGB().c3
    },
    hue(): number {
        return this.toHSL().c1
    },
    saturation(): number {
        return this.toHSL().c2
    },
    lightness(): number {
        return this.toHSL().c3
    },
    alpha(): number {
        return this.a
    },
    opacity(): number {
        return this.a
    }
} as ColorHelper

/**
 * Creates a color from a hex color code or named color.
 * e.g. color('red') or color('#FF0000') or color('#F00'))
 */
export function color(value: string | ColorHelper): ColorHelper {
    if ((value as ColorHelper).type === 'color') {
        return value as ColorHelper
    }

    let result: ColorHelper | undefined
    for (let i = 0, ilen = colorParsers.length; i < ilen; i++) {
        result = colorParsers[i](value as string)
        if (result) {
            return result
        }
    }

    return createColor(RGB, 255, 0, 0, 1, false)
}

export function createColor(format: number, c1: number, c2: number, c3: number, a: number, hasAlpha: boolean) {
    let max1, max2, max3
    if (format === HSL) {
        max1 = H;
        max2 = S;
        max3 = L;
    } else {
        max1 = R;
        max2 = G;
        max3 = B;
    }
    
    const self = Object.create(colorPrototype) as ColorHelper
    self.s = format
    self.isAlpha = hasAlpha
    self.c1 = clampColor(format, 0, c1)
    self.c2 = clampColor(format, 0, c2)
    self.c3 = clampColor(format, 0, c3)
    self.a = clampColor(format, A, a)
    return self
}

/**
 * Converts from one format to another format
 */
export function convert(original: ColorHelper, toType: number, hasAlpha: boolean): ColorHelper {
    const type = original.s

    if (type !== toType) {
        // if types are not the same convert
        return colorConverters[type - toType](original, hasAlpha)
    }
    if (hasAlpha !== original.isAlpha) {
        // if types are same but alpha is not, create a new color
        return createColor(type, original.c1, original.c2, original.c3, original.a, hasAlpha)
    }

    // else return the same instance, nothing has changed
    return original
}

export function clampColor(format: number, channel: number, value: number): number {
    const val = value || 0
    const min = 0
    const max = maxChannelValues[format][channel]
    return val < min ? min : val > max ? max : val
}

function RGBtoHSL(i: ColorHelper, hasAlpha: boolean): ColorHelper {
    const r = i.c1 / 255
    const g = i.c2 / 255
    const b = i.c3 / 255
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

    return createColor(HSL, h, s, l, i.a, hasAlpha)
}

function HSLtoRGB(i: ColorHelper, hasAlpha: boolean): ColorHelper {
    const h = i.c1 / 360
    const s = i.c2
    const l = i.c3

    if (s === 0) {
        const val = l * 255
        return createColor(RGB, val, val, val, i.a, hasAlpha)
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

    return createColor(RGB, r, g, b, i.a, hasAlpha)
}
