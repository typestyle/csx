import { ColorHelper, colorPrototype, createColor, convert } from './color-helper'
import { maxChannelValues, S, HSL } from './constants'
import { ensurePercent } from '../../utils/formatting'

/**
 * 
 * @param this 
 * @param percent 
 * @param relative 
 */
export function desaturate(this: ColorHelper, percent: string | number, relative?: boolean): ColorHelper {
    const original = this
    const v = original.toHSL()
    const max = maxChannelValues[HSL][S]
    const s = v.c2 - (relative ? v.c2 : max) * ensurePercent(percent)
    return convert(createColor(HSL, v.c1, s, v.c3, original.a, original.isAlpha), original.s, original.isAlpha);
}

colorPrototype.desaturate = desaturate

declare module './color-helper' {
    interface ColorHelper {
        desaturate: typeof desaturate
    }
}
