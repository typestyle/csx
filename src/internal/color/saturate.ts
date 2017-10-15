import { ColorHelper, convert, createColor, colorPrototype } from './color-helper'
import { maxChannelValues, HSL, S } from './constants'
import { ensurePercent } from '../../utils/formatting'

export function saturate(this: ColorHelper, percent: string | number, relative?: boolean): ColorHelper {
    const original = this
    const v = original.toHSL()
    const max = maxChannelValues[HSL][S]
    const s = v.c2 + (relative ? max - v.c2 : max) * ensurePercent(percent)
    return convert(createColor(HSL, v.c1, s, v.c3, original.a, original.isAlpha), original.s, original.isAlpha);
}

colorPrototype.saturate = saturate

declare module './color-helper' {
    interface ColorHelper {
        saturate: typeof saturate
    }
}
