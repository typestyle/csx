import { ColorHelper, convert } from './color-helper' 
import { modDegrees } from '../../utils/math'
import { HSL, H, S, L, A } from './constants' 

export function spin(this: ColorHelper, degrees: number): ColorHelper {
    const v = this.toHSL().channels
    return convert(
        new ColorHelper(HSL, modDegrees(v[H] + degrees), v[S], v[L], this.channels[A], this.isAlpha),
        this.type,
        this.isAlpha
    )
}

ColorHelper.prototype.spin = spin

declare module './color-helper' {
    interface ColorHelper {
        spin: typeof spin
    }
}
