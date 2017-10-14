import { ColorHelper } from './color-helper'
import { RGB } from './constants'
import { ensurePercent } from '../../utils/formatting'

/**
 * Creates a color form the red, blue, green, and alpha in the color space
 */
export function rgba(red: number, blue: number, green: number, alpha: string | number): ColorHelper {
    return new ColorHelper(RGB, red, blue, green, ensurePercent(alpha), true)
}
