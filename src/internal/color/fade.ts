import { ColorHelper, colorPrototype, createColor } from './color-helper'
import { ensurePercent } from '../../utils/formatting'

export function fade(this: ColorHelper, percent: string | number): ColorHelper {
    const v = this
    const a = ensurePercent(percent)
    return createColor(v.s, v.c1, v.c2, v.c3, a, true)
}

colorPrototype.fade = fade

declare module './color-helper' {
    interface ColorHelper {
        fade: typeof fade
    }
}
