import { ensurePercent } from "../../utils/formatting";
import { modDegrees } from '../../utils/math'
import { HSL } from './constants'
import { ColorHelper } from './color-helper'

/**
 * Creates a color from hue, saturation, lightness, and alpha
 */
export function hsla(
    hue: number,
    saturation: string | number,
    lightness: string | number,
    opacity: string | number
): ColorHelper {
    return new ColorHelper(
        HSL,
        modDegrees(hue),
        ensurePercent(saturation),
        ensurePercent(lightness),
        ensurePercent(opacity),
        true
    )
}
