import { ColorHelper, colorPrototype } from './color-helper'

export function grayscale(this: ColorHelper): ColorHelper {
    return this.desaturate(1)
}

colorPrototype.grayscale = grayscale

declare module './color-helper' {
    interface ColorHelper {
        grayscale: typeof grayscale
    }
}
