import { ColorHelper } from './color-helper'

export function grayscale(this: ColorHelper): ColorHelper {
    return this.desaturate(1)
}

ColorHelper.prototype.grayscale = grayscale

declare module './color-helper' {
    interface ColorHelper {
        grayscale: typeof grayscale
    }
}
