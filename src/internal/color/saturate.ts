import { ColorHelper, convert } from './color-helper'
import { maxChannelValues, HSL, S, H, L, A } from './constants'
import { ensurePercent } from '../../utils/formatting'

export function saturate(this: ColorHelper, percent: string | number, relative?: boolean): ColorHelper {
    const v = this.toHSL().channels
    const max = maxChannelValues[HSL][S]
    const s = v[S] + (relative ? max - v[S] : max) * ensurePercent(percent)
    return convert(new ColorHelper(HSL, v[H], s, v[L], this.channels[A], this.isAlpha), this.type, this.isAlpha);
}

ColorHelper.prototype.saturate = saturate


declare module './color-helper' {
    interface ColorHelper {
        saturate: typeof saturate
    }
}