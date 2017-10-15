import { CSSColor } from 'typestyle/lib/types'
import { cssFunction, formatPercent, formatFloat } from '../../utils/formatting'
import { roundFloat } from '../../utils/math'
import { RGB, HSL } from './constants'
import { ColorHelper, colorPrototype } from './color-helper'

/**
 * Converts the stored color into string form (which is used by Free Style)
 */
export function toString(this: ColorHelper): CSSColor {
    const v = this
    const hasAlpha = v.isAlpha

    let fnName: string
    let params: (number | string)[]

    // find function name and resolve first three channels
    if (v.s === RGB) {
        fnName = hasAlpha ? 'rgba' : 'rgb'
        params = [Math.round(v.c1), Math.round(v.c2), Math.round(v.c3)]
    } else if (v.s === HSL) {
        fnName = hasAlpha ? 'hsla' : 'hsl'
        params = [Math.round(v.c1), formatPercent(roundFloat(v.c2, 100)), formatPercent(roundFloat(v.c3, 100))]
    } else {
        throw new Error('Invalid color')
    }

    // add alpha channel if needed
    if (hasAlpha) {
        params.push(formatFloat(roundFloat(v.a, 100000)))
    }
    
    // return as a string
    return cssFunction(fnName, params)
}

declare module './color-helper' {
    interface ColorHelper {
        toString: typeof toString
    }
}

colorPrototype.toString = toString