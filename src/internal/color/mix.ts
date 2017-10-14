import { CSSColor } from 'typestyle/lib/types' 
import { ColorHelper, color, convert } from './color-helper'
import { RGB, R, G, B, A } from './constants'

export function mix(this: ColorHelper, mixin: CSSColor | ColorHelper, weight?: number): ColorHelper {
    const color1 = this
    const color2 = color(mixin)
    const c1 = color1.toRGB().channels
    const c2 = color2.toRGB().channels
    const p = weight === undefined ? 0.5 : weight
    const w = 2 * p - 1
    const a = Math.abs(c1[A] - c2[A])
    const w1 = ((w * a === -1 ? w : (w + a) / (1 + w * a)) + 1) / 2.0
    const w2 = 1 - w1

    const helper = new ColorHelper(
        RGB,
        Math.round(c1[R] * w1 + c2[R] * w2),
        Math.round(c1[G] * w1 + c2[G] * w2),
        Math.round(c1[B] * w1 + c2[B] * w2),
        c1[A] * p + c2[A] * (1 - p),
        color1.isAlpha || color2.isAlpha
    )

    return convert(helper, this.type, this.isAlpha)
}

ColorHelper.prototype.mix = mix

declare module './color-helper' {
    interface ColorHelper {
        mix: typeof mix
    }
}
