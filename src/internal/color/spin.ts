import { ColorHelper, convert, createColor, colorPrototype } from './color-helper' 
import { modDegrees } from '../../utils/math'
import { HSL } from './constants' 

export function spin(this: ColorHelper, degrees: number): ColorHelper {
    const original = this
    const v = original.toHSL()
    return convert(
        createColor(HSL, modDegrees(v.c1 + degrees), v.c2, v.c3, original.a, original.isAlpha),
        original.s,
        original.isAlpha
    )
}

colorPrototype.spin = spin

declare module './color-helper' {
    interface ColorHelper {
        spin: typeof spin
    }
}
