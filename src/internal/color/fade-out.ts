import { ColorHelper } from './color-helper'
import { A, RGB, R, G, B } from './constants'
import { clampColor } from './clamp-color'
import { ensurePercent } from '../../utils/formatting' 

export function fadeOut(this: ColorHelper, percent: string | number, relative?: boolean): ColorHelper {
    const v = this.channels
    const max = 1
    const a = clampColor(RGB, A, v[A] - (relative ? v[A] : max) * ensurePercent(percent))
    return new ColorHelper(this.type, v[R], v[G], v[B], a, true)
}

ColorHelper.prototype.fadeOut = fadeOut

declare module './color-helper' {
    interface ColorHelper {
        fadeOut: typeof fadeOut
    }
}
