import { RGB } from './constants'
import { ColorHelper, createColor } from './color-helper'

/**
 * Creates a color form the red, blue, and green color space.  Alpha is automatically set to 100%
 */
export function rgb(red: number, green: number, blue: number): ColorHelper {
    return createColor(RGB, red, green, blue, 1, false)
}
