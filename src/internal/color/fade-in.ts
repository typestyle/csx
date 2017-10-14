import { ColorHelper } from './color-helper'
import { clampColor } from './clamp-color'
import { ensurePercent } from '../../utils/formatting'
import { RGB, R, G, B, A } from './constants'

/**
 * 
 * @param this 
 * @param percent 
 * @param relative 
 */
export function fadeIn(this: ColorHelper, percent: string | number, relative?: boolean): ColorHelper {
    const v = this.channels
    const max = 1
    const a = clampColor(RGB, A, v[A] + (relative ? v[A] : max) * ensurePercent(percent))
    
    return new ColorHelper(this.type, v[R], v[G], v[B], a, true)
}

ColorHelper.prototype.fadeIn = fadeIn

declare module './color-helper' {
    interface ColorHelper {
        fadeIn: typeof fadeIn
    }
}
