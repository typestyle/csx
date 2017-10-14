import { ColorHelper } from './color-helper'
import { HSL, L, maxChannelValues, A, H, S } from './constants'
import { ensurePercent } from '../../utils/formatting'

export function darken(this: ColorHelper, percent: string | number, relative?: boolean): ColorHelper {
    const v = this.toHSL().channels
    const l = v[L] - (relative ? v[L] : maxChannelValues[HSL][L]) * ensurePercent(percent)
    return new ColorHelper(this.type, v[H], v[S], l, v[A], this.isAlpha)
}

ColorHelper.prototype.darken = darken

declare module './color-helper' {
    interface ColorHelper {
        darken: typeof darken
    }
}
