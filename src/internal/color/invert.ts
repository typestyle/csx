import { ColorHelper, convert, createColor, colorPrototype } from './color-helper'
import { RGB } from './constants'

export function invert(this: ColorHelper): ColorHelper {
    const current = this
    const v = current.toRGB()
    return convert(
        createColor(RGB, 255 - v.c1, 255 - v.c2, 255 - v.c3, current.a, current.isAlpha),
        current.s,
        current.isAlpha
    )
}

colorPrototype.invert = invert

declare module './color-helper' {
    interface ColorHelper {
        invert: typeof invert
    }
}
