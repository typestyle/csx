import { ColorHelper, convert } from './color-helper'
import { RGB, R, G, B, A } from './constants'

export function invert(this: ColorHelper): ColorHelper {
    const v = this.toRGB().channels
    return convert(
        new ColorHelper(RGB, 255 - v[R], 255 - v[G], 255 - v[B], v[A], this.isAlpha),
        this.type,
        this.isAlpha
    )
}

ColorHelper.prototype.invert = invert

declare module './color-helper' {
    interface ColorHelper {
        invert: typeof invert
    }
}
