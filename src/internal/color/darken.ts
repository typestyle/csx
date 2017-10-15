import { ColorHelper, colorPrototype, createColor, convert } from './color-helper'
import { HSL, L, maxChannelValues } from './constants'
import { ensurePercent } from '../../utils/formatting'

export function darken(this: ColorHelper, percent: string | number, relative?: boolean): ColorHelper {
    const current = this
    const v = current.toHSL()
    const l = v.c3 - (relative ? v.c3 : maxChannelValues[HSL][L]) * ensurePercent(percent)
    return convert(createColor(HSL, v.c1, v.c2, l, v.a, current.isAlpha), current.s, current.isAlpha)
}

colorPrototype.darken = darken

declare module './color-helper' {
    interface ColorHelper {
        darken: typeof darken
    }
}
