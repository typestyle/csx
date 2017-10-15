import { ColorHelper, colorPrototype } from './color-helper'
import { black } from './names'

export function shade(this: ColorHelper, weight: number): ColorHelper {
    return black.mix(this, weight)
}

colorPrototype.shade = shade


declare module './color-helper' {
    interface ColorHelper {
        shade: typeof shade
    }
}