import { CSSColor } from 'typestyle/lib/types' 
import { ColorHelper, color, convert, createColor, colorPrototype } from './color-helper'
import { RGB } from './constants'

export function mix(this: ColorHelper, mixin: CSSColor | ColorHelper, weight?: number): ColorHelper {
    const original = this
    const color2 = color(mixin)
    const source = original.toRGB()
    const dest = color2.toRGB()
    const p = weight === undefined ? 0.5 : weight
    const w = 2 * p - 1
    const a = Math.abs(source.a - dest.a)
    const w1 = ((w * a === -1 ? w : (w + a) / (1 + w * a)) + 1) / 2.0
    const w2 = 1 - w1

    const helper = createColor(
        RGB,
        Math.round(source.c1 * w1 + dest.c1 * w2),
        Math.round(source.c2 * w1 + dest.c2 * w2),
        Math.round(source.c3 * w1 + dest.c3 * w2),
        source.a * p + dest.a * (1 - p),
        original.isAlpha || color2.isAlpha
    )

    return convert(helper, original.s, original.isAlpha || color2.isAlpha)
}

colorPrototype.mix = mix

declare module './color-helper' {
    interface ColorHelper {
        mix: typeof mix
    }
}
