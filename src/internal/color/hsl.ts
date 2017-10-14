import { HSL } from './constants'
import { ColorHelper } from './color-helper'
import { modDegrees } from '../../utils/math'
import { ensurePercent } from '../../utils/formatting'

/**
 * Creates a color from hue, saturation, and lightness.  Alpha is automatically set to 100%
 */
export function hsl(hue: number, saturation: string | number, lightness: string | number): ColorHelper {
    return new ColorHelper(HSL, modDegrees(hue), ensurePercent(saturation), ensurePercent(lightness), 1, false)
}
