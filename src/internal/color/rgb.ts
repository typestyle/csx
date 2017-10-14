import { RGB } from './constants'
import { ColorHelper } from './color-helper'

/**
 * Creates a color form the red, blue, and green color space.  Alpha is automatically set to 100%
 */
export function rgb(red: number, blue: number, green: number): ColorHelper {
    return new ColorHelper(RGB, red, blue, green, 1, false)
}
