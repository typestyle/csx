import { ColorHelper, colorPrototype } from './color-helper'
import { CSSColor } from 'typestyle/lib/types'
import { toHex } from '../../utils/math'

/**
* Converts to hex; rgb(255, 255, 255) to #FFFFFF
*/
export function toHexString(this: ColorHelper): CSSColor {
    const v = this.toRGB()
    return '#' + (toHex(v.c1) + toHex(v.c2) + toHex(v.c3)).toUpperCase()
}

declare module './color-helper' {
    interface ColorHelper {
        toHexString: typeof toHexString
    }
}

colorPrototype.toHexString = toHexString
