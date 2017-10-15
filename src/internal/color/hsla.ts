import { ensurePercent } from '../../utils/formatting'
import { modDegrees } from '../../utils/math'
import { HSL } from './constants'
import { ColorHelper, createColor } from './color-helper'

/**
 * Creates a color from hue, saturation, lightness, and alpha
 */
export function hsla(
    hue: number,
    saturation: string | number,
    lightness: string | number,
    alpha: string | number
): ColorHelper {
    return createColor(
        HSL,
        modDegrees(hue),
        ensurePercent(saturation),
        ensurePercent(lightness),
        ensurePercent(alpha),
        true
    )
}
