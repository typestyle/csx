import { HSL, maxChannelValues, L } from './constants'
import { ColorHelper, convert, createColor, colorPrototype } from './color-helper'
import { ensurePercent } from '../../utils/formatting'

export function lighten(this: ColorHelper, percent: string | number, relative?: boolean): ColorHelper {
    const current = this
    const v = current.toHSL()
    const max = maxChannelValues[HSL][L]
    const l = v.c3 + (relative ? max - v.c3 : max) * ensurePercent(percent)
    return convert(createColor(HSL, v.c1, v.c2, l, current.a, current.isAlpha), current.s, current.isAlpha)
}

colorPrototype.lighten = lighten

declare module './color-helper' {
    interface ColorHelper {
        lighten: typeof lighten
    }
}
