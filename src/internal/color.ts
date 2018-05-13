import { CSSColor, CSSNamedColor } from 'typestyle/lib/types';
import { ensurePercent, formatPercent, parseCSSFunction, cssFunction, formatFloat, roundFloat, toFloat } from '../utils';
import { StringType } from '../types';

const isTypeArraySupported = typeof Float32Array !== 'undefined';

const RGB = 0,
    HSL = 1,
    R = 0,
    G = 1,
    B = 2,
    H = 0,
    S = 1,
    L = 2,
    A = 3;

type ColorFormat = typeof HSL | typeof RGB;

/**
 * Map of Color converters.  By subtracting the from-format from the to-format, we can
 * quickly map to the right converter. 1-2 and 2-1 yield different results, so this
 * allows us to choose the right converter observing the direction correcly
 */
const converters = {
    [RGB - HSL]: RGBtoHSL,
    [HSL - RGB]: HSLtoRGB
};

/**
 * Describe the ceiling for each color channel for each format
 */
const maxChannelValues = {
    [RGB]: colorArray(255, 255, 255, 1),
    [HSL]: colorArray(360, 1, 1, 1)
};

/**
 * Creates a color from a hex color code or named color.
 * e.g. color('red') or color('#FF0000') or color('#F00'))
 */
export function color(value: CSSNamedColor | string): ColorHelper {
    return parseHexCode(value) || parseColorFunction(value) || rgb(255, 0, 0)!;
}

/**
 * Creates a color from hue, saturation, and lightness.  Alpha is automatically set to 100%
 */
export function hsl(hue: number, saturation: string | number, lightness: string | number): ColorHelper {
    return new ColorHelper(HSL, modDegrees(hue), ensurePercent(saturation), ensurePercent(lightness), 1, false);
}

/**
 * Creates a color from hue, saturation, lightness, and alpha
 */
export function hsla(hue: number, saturation: string | number, lightness: string | number, opacity: string | number): ColorHelper {
    return new ColorHelper(HSL, modDegrees(hue), ensurePercent(saturation), ensurePercent(lightness), ensurePercent(opacity), true);
}

/**
 * Creates a color form the red, blue, and green color space.  Alpha is automatically set to 100%
 */
export function rgb(red: number, blue: number, green: number): ColorHelper {
    return new ColorHelper(RGB, red, blue, green, 1, false);
}

/**
 * Creates a color form the red, blue, green, and alpha in the color space
 */
export function rgba(red: number, blue: number, green: number, alpha: string | number): ColorHelper {
    return new ColorHelper(RGB, red, blue, green, ensurePercent(alpha), true);
}

function convertHelper(toFormat: number, helper: ColorHelper | any, forceAlpha?: boolean): ColorHelper {
    const fromFormat = helper.f;
    const v = helper.c;
    const a = forceAlpha === undefined ? helper.a : forceAlpha;
    if (fromFormat !== toFormat) {
        return converters[fromFormat - toFormat](v[R], v[G], v[B], v[A], a);
    }
    return forceAlpha === undefined ? helper : new ColorHelper(fromFormat, v[R], v[G], v[B], v[A], a);
}

/**
 * A CSS Color.  Includes utilities for converting between color types
 */
export class ColorHelper implements StringType<CSSColor> {
    /** 
     * True if the color should output the alpha channel
     * @private 
     */
    private a: boolean;
    /** 
     * Color channels
     * @private 
     */
    private c: number[];
    /** 
     * Format of the color RGB = 0, HSL = 1
     * @private 
     */
    private f: number;

    constructor(format: number, c0: number, c1: number, c2: number, c3: number, hasAlpha: boolean) {
        this.f = format;
        this.a = hasAlpha;
        this.c = colorArray(
            clampColor(format as ColorFormat, 0, c0),
            clampColor(format as ColorFormat, 1, c1),
            clampColor(format as ColorFormat, 2, c2),
            clampColor(format as ColorFormat, 3, c3)
        );
    }

    /**
     * Converts the stored color into string form (which is used by Free Style)
     */
    public toString(): CSSColor {
        const format = this.f;
        const v = this.c;
        const hasAlpha = this.a;

        let fnName: string;
        let params: (number | string)[];

        // find function name and resolve first three channels
        if (format === RGB) {
            fnName = hasAlpha ? 'rgba' : 'rgb';
            params = [Math.round(v[R]), Math.round(v[G]), Math.round(v[B])];
        } else if (format === HSL) {
            fnName = hasAlpha ? 'hsla' : 'hsl';
            params = [Math.round(v[H]), formatPercent(roundFloat(v[S], 100)), formatPercent(roundFloat(v[L], 100))];
        } else {
            throw new Error('Invalid color format');
        }

        // add alpha channel if needed
        if (hasAlpha) {
            params.push(formatFloat(roundFloat(v[A], 100000)));
        }

        // return as a string
        return cssFunction(fnName, params);
    }

    /**
     * Converts to hex rgb(255, 255, 255) to #FFFFFF
     */
    public toHexString(): string {
        const v = convertHelper(RGB, this).c;
        return '#' + (toHex(v[R]) + toHex(v[G]) + toHex(v[B])).toUpperCase();
    }

    /**
     * Converts to the Hue, Saturation, Lightness color space
     */
    public toHSL(): ColorHelper {
        return convertHelper(HSL, this, false);
    }

    /**
     * Converts to the Hue, Saturation, Lightness color space and adds an alpha channel
     */
    public toHSLA(): ColorHelper {
        return convertHelper(HSL, this, true);
    }

    /**
     * Converts to the Red, Green, Blue color space
     */
    public toRGB(): ColorHelper {
        return convertHelper(RGB, this, false);
    }

    /**
     * Converts to the Red, Green, Blue color space and adds an alpha channel
     */
    public toRGBA(): ColorHelper {
        return convertHelper(RGB, this, true);
    }

    public red(): number {
        return (this.f === RGB ? this : this.toRGB()).c[0];
    }

    public green(): number {
        return (this.f === RGB ? this : this.toRGB()).c[1];
    }

    public blue(): number {
        return (this.f === RGB ? this : this.toRGB()).c[2];
    }

    public hue(): number {
        return (this.f === HSL ? this : this.toHSL()).c[0];
    }

    public saturation(): number {
        return (this.f === HSL ? this : this.toHSL()).c[1];
    }

    public lightness(): number {
        return (this.f === HSL ? this : this.toHSL()).c[2];
    }

    public alpha(): number {
        return this.c[A];
    }

    public opacity(): number {
        return this.alpha();
    }

    public invert(): ColorHelper {
        const v = convertHelper(RGB, this).c;
        return convertHelper(this.f, new ColorHelper(RGB, 255 - v[R], 255 - v[G], 255 - v[B], this.c[A], this.a));
    }

    public lighten(percent: string | number, relative?: boolean): ColorHelper {
        const v = convertHelper(HSL, this).c;
        const max = maxChannelValues[HSL][L];
        const l = v[L] + (relative ? max - v[L] : max) * ensurePercent(percent);
        return convertHelper(this.f, new ColorHelper(HSL, v[H], v[S], l, this.c[A], this.a));
    }

    public darken(percent: string | number, relative?: boolean): ColorHelper {
        const v = convertHelper(HSL, this).c;
        const l = v[L] - (relative ? v[L] : maxChannelValues[HSL][L]) * ensurePercent(percent);
        return convertHelper(this.f, new ColorHelper(HSL, v[H], v[S], l, this.c[A], this.a));
    }

    public saturate(percent: string | number, relative?: boolean): ColorHelper {
        const v = convertHelper(HSL, this).c;
        const max = maxChannelValues[HSL][S];
        const s = v[S] + (relative ? max - v[S] : max) * ensurePercent(percent);
        return convertHelper(this.f, new ColorHelper(HSL, v[H], s, v[L], this.c[A], this.a));
    }

    public desaturate(percent: string | number, relative?: boolean): ColorHelper {
        const v = convertHelper(HSL, this).c;
        const max = maxChannelValues[HSL][S];
        const s = v[S] - (relative ? v[S] : max) * ensurePercent(percent);
        return convertHelper(this.f, new ColorHelper(HSL, v[H], s, v[L], this.c[A], this.a));
    }

    public grayscale() {
        return this.desaturate(1);
    }

    public fade(percent: string | number): ColorHelper {
        const v = this.c;
        const a = clampColor(RGB, A, ensurePercent(percent));
        return convertHelper(this.f, new ColorHelper(this.f, v[R], v[G], v[B], a, true));
    }

    public fadeOut(percent: string | number, relative?: boolean): ColorHelper {
        const v = this.c;
        const max = 1;
        const a = clampColor(RGB, A, v[A] - (relative ? v[A] : max) * ensurePercent(percent));
        return convertHelper(this.f, new ColorHelper(this.f, v[R], v[G], v[B], a, true));
    }

    public fadeIn(percent: string | number, relative?: boolean): ColorHelper {
        const v = this.c;
        const max = 1;
        const a = clampColor(RGB, A, v[A] + (relative ? v[A] : max) * ensurePercent(percent));
        return convertHelper(this.f, new ColorHelper(this.f, v[R], v[G], v[B], a, true));
    }

    public mix(mixin: CSSColor | ColorHelper, weight?: number): ColorHelper {
        const color1 = this;
        const color2 = ensureColor(mixin);
        const c1 = convertHelper(RGB, color1).c;
        const c2 = convertHelper(RGB, color2).c;
        const p = weight === undefined ? 0.5 : weight;
        const w = 2 * p - 1;
        const a = Math.abs(c1[A] - c2[A]);
        const w1 = ((w * a === -1 ? w : (w + a) / (1 + w * a)) + 1) / 2.0;
        const w2 = 1 - w1;

        const helper = new ColorHelper(
            RGB,
            Math.round(c1[R] * w1 + c2[R] * w2),
            Math.round(c1[G] * w1 + c2[G] * w2),
            Math.round(c1[B] * w1 + c2[B] * w2),
            c1[A] * p + c2[A] * (1 - p),
            color1.a || color2.a
        );

        return convertHelper(this.f, helper);
    }

    public tint(weight: number): ColorHelper {
        return rgb(255, 255, 255).mix(this, weight);
    }

    public shade(weight: number): ColorHelper {
        return rgb(0, 0, 0).mix(this, weight);
    }

    public spin(degrees: number): ColorHelper {
        const v = convertHelper(HSL, this).c;
        return convertHelper(this.f, new ColorHelper(HSL, modDegrees(v[H] + degrees), v[S], v[L], this.c[A], this.a));
    }
}

function toHex(n: number): string {
    const i = Math.round(n);
    return (i < 16 ? '0' : '') + i.toString(16);
}

function modDegrees(n: number): number {
    // note: maybe there is a way to simplify this
    return ((n < 0 ? 360 : 0) + n % 360) % 360;
}

function RGBtoHSL(c0: number, c1: number, c2: number, c3: number, hasAlpha: boolean): ColorHelper {
    const r = c0 / 255;
    const g = c1 / 255;
    const b = c2 / 255;
    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);
    const l = (min + max) / 2;
    const delta = max - min;

    let h: number;
    if (max === min) {
        h = 0;
    } else if (r === max) {
        h = (g - b) / delta;
    } else if (g === max) {
        h = 2 + (b - r) / delta;
    } else if (b === max) {
        h = 4 + (r - g) / delta;
    } else {
        h = 0;
    }

    h = Math.min(h * 60, 360);

    if (h < 0) {
        h += 360;
    }

    let s: number;
    if (max === min) {
        s = 0;
    } else if (l <= 0.5) {
        s = delta / (max + min);
    } else {
        s = delta / (2 - max - min);
    }

    return new ColorHelper(HSL, h, s, l, c3, hasAlpha);
}

function HSLtoRGB(c0: number, c1: number, c2: number, c3: number, hasAlpha: boolean): ColorHelper {
    const h = c0 / 360;
    const s = c1;
    const l = c2;

    if (s === 0) {
        const val = l * 255;
        return new ColorHelper(RGB, val, val, val, c3, hasAlpha);
    }

    const t2 = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const t1 = 2 * l - t2;

    let r = 0,
        g = 0,
        b = 0;
    for (let i = 0; i < 3; i++) {
        let t3 = h + 1 / 3 * -(i - 1);
        if (t3 < 0) {
            t3++;
        }
        if (t3 > 1) {
            t3--;
        }

        let val: number;
        if (6 * t3 < 1) {
            val = t1 + (t2 - t1) * 6 * t3;
        } else if (2 * t3 < 1) {
            val = t2;
        } else if (3 * t3 < 2) {
            val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
        } else {
            val = t1;
        }
        val *= 255;

        // manually set variables instead of using an array
        if (i === 0) {
            r = val;
        } else if (i === 1) {
            g = val;
        } else {
            b = val;
        }
    }

    return new ColorHelper(RGB, r, g, b, c3, hasAlpha);
}

function colorArray(c0: number, c1: number, c2: number, c3: number): number[] {
    if (!isTypeArraySupported) {
        return [c0 || 0, c1 || 0, c2 || 0, c3 || 0];
    }
    const a = new Float32Array(4);
    a[0] = c0 || 0;
    a[1] = c1 || 0;
    a[2] = c2 || 0;
    a[3] = c3 || 0;
    return (a as any) as number[];
}

function clampColor(format: ColorFormat, channel: number, value: number): number {
    const min = 0;
    const max = maxChannelValues[format][channel];
    return value < min ? min : value > max ? max : value;
}

function ensureColor(c: CSSColor | ColorHelper): ColorHelper {
    return c instanceof ColorHelper ? (c as ColorHelper) : color(c as string);
}

function parseHexCode(stringValue: string): ColorHelper | undefined {
    const match = stringValue.match(/#(([a-f0-9]{6})|([a-f0-9]{3}))$/i);
    if (!match) {
        return undefined;
    }

    const hex = match[1];
    const hexColor = parseInt(hex.length === 3 ? hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2] : hex, 16);
    const r = (hexColor >> 16) & 0xff;
    const b = (hexColor >> 8) & 0xff;
    const g = hexColor & 0xff;

    return new ColorHelper(RGB, r, b, g, 1, false);
}

function parseColorFunction(colorString: string): ColorHelper | undefined {
    const cssParts = parseCSSFunction(colorString);
    if (!cssParts || !(cssParts.length === 4 || cssParts.length === 5)) {
        return undefined;
    }

    const fn = cssParts[0];
    const isRGBA = fn === 'rgba';
    const isHSLA = fn === 'hsla';
    const isRGB = fn === 'rgb';
    const isHSL = fn === 'hsl';
    const hasAlpha = isHSLA || isRGBA;

    let type: number;
    if (isRGB || isRGBA) {
        type = RGB;
    } else if (isHSL || isHSLA) {
        type = HSL;
    } else {
        throw new Error('unsupported color string');
    }

    const c0 = toFloat(cssParts[1]);
    const c1 = isRGB || isRGBA ? toFloat(cssParts[2]) : ensurePercent(cssParts[2]);
    const c2 = isRGB || isRGBA ? toFloat(cssParts[3]) : ensurePercent(cssParts[3]);
    const c3 = hasAlpha ? toFloat(cssParts[4]) : 1;

    return new ColorHelper(type, c0, c1, c2, c3, hasAlpha);
}
