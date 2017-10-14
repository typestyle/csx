import { HSL, H, S, L, A, maxChannelValues} from './constants'
import { ColorHelper, convert } from './color-helper'
import { ensurePercent } from '../../utils/formatting'

export function lighten(this: ColorHelper, percent: string | number, relative?: boolean): ColorHelper {
    const v = this.toHSL().channels
    const max = maxChannelValues[HSL][L]
    const l = v[L] + (relative ? max - v[L] : max) * ensurePercent(percent)
    return convert(new ColorHelper(HSL, v[H], v[S], l, this.channels[A], this.isAlpha), this.type, this.isAlpha)
}

ColorHelper.prototype.lighten = lighten

declare module './color-helper' {
    interface ColorHelper {
        lighten: typeof lighten
    }
}
