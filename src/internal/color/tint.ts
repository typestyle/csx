import { ColorHelper } from './color-helper'
import { white } from './names'

export function tint(this: ColorHelper, weight: number): ColorHelper {
    return white.mix(this, weight)
}

ColorHelper.prototype.tint = tint

declare module './color-helper' {
    interface ColorHelper {
        tint: typeof tint
    }
}
