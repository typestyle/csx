import { ColorHelper, createColor, colorPrototype } from './color-helper'
import { ensurePercent } from '../../utils/formatting'

/**
 * 
 * @param this 
 * @param percent 
 * @param relative 
 */
export function fadeIn(this: ColorHelper, percent: string | number, relative?: boolean): ColorHelper {
    const v = this
    const max = 1
    const a = v.a + (relative ? v.a : max) * ensurePercent(percent)
    
    return createColor(v.s, v.c1, v.c2, v.c3, a, true)
}

colorPrototype.fadeIn = fadeIn

declare module './color-helper' {
    interface ColorHelper {
        fadeIn: typeof fadeIn
    }
}
