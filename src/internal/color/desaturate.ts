import { ColorHelper } from './color-helper'
import { maxChannelValues, S, HSL, H, L, A } from './constants'
import { ensurePercent } from '../../utils/formatting'

/**
 * 
 * @param this 
 * @param percent 
 * @param relative 
 */
export function desaturate(this: ColorHelper, percent: string | number, relative?: boolean): ColorHelper {
    const v = this.toHSL().channels
    const max = maxChannelValues[HSL][S]
    const s = v[S] - (relative ? v[S] : max) * ensurePercent(percent)
    return new ColorHelper(HSL, v[H], s, v[L], v[A], this.isAlpha)
}

ColorHelper.prototype.desaturate = desaturate

declare module './color-helper' {
    interface ColorHelper {
        desaturate: typeof desaturate
    }
}
