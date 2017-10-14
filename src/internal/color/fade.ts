import { ColorHelper } from './color-helper'
import { RGB, R, B, G, A } from './constants'
import { clampColor } from './clamp-color'
import { ensurePercent } from '../../utils/formatting'

export function fade(this: ColorHelper, percent: string | number): ColorHelper {
    const v = this.channels
    const a = clampColor(RGB, A, ensurePercent(percent))
    return new ColorHelper(this.type, v[R], v[G], v[B], a, true)
}

ColorHelper.prototype.fade = fade

declare module './color-helper' {
    interface ColorHelper {
        fade: typeof fade
    }
}
