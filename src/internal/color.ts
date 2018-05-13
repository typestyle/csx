import { CSSColor, CSSNamedColor } from 'typestyle/lib/types';
import { ensurePercent, formatPercent, parseCSSFunction, cssFunction, formatFloat, roundFloat, toFloat, round } from '../utils';
import { StringType } from '../types';

const RGB = 'rgb', HSL = 'hsl';

const converters = {
    [RGB + HSL]: RGBtoHSL,
    [HSL + RGB]: HSLtoRGB
};

/**
 * Describe the ceiling for each color channel for each format
 */
const maxChannelValues = {
    r: 255,
    g: 255,
    b: 255,
    h: 360,
    s: 1,
    l: 1,
    a: 1
}

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

function convertHelper(toFormat: 'rgb' | 'hsl', helper: ColorHelper | any, forceAlpha?: boolean): ColorHelper {
    const { f: fromFormat, r, g, b, a } = helper;
    const newAlpha = forceAlpha === undefined ? helper.o : forceAlpha;
    if (fromFormat !== toFormat) {
        return converters[fromFormat + toFormat](r, g, b, a, newAlpha);
    }
    return forceAlpha === undefined ? helper : new ColorHelper(fromFormat, r, g, b, a, newAlpha);
}

/**
 * A CSS Color.  Includes utilities for converting between color types
 */
export class ColorHelper implements StringType<CSSColor> {
    /**
     * Format of the color
     * @private
     */
    private f: 'rgb' | 'hsl';
    /**
     * True if the color should output opacity in the formatted result
     * @private
     */
    private o: boolean;
    /**
     * Channel 0
     * @private
     */
    private r: number;
    /**
     * Channel 1
     * @private
     */
    private g: number;
    /**
     * Channel 2
     * @private
     */
    private b: number;
    /**
     * Channel Alpha
     * @private
     */
    private a: number;

    constructor(format: 'rgb' | 'hsl', r: number, g: number, b: number, a: number, hasAlpha: boolean) {
        const self = this;
        self.f = format;
        self.o = hasAlpha;

        const isHSL = format === HSL;
        self.r = clampColor(isHSL ? 'h': 'r', r);
        self.g = clampColor(isHSL ? 's': 'g', g);
        self.b = clampColor(isHSL ? 'l': 'b', b);
        self.a = clampColor('a', a);
    }

    /**
     * Converts the stored color into string form (which is used by Free Style)
     */
    public toString(): CSSColor {
        const { o: hasAlpha, f: format, r, g, b, a } = this;

        let fnName: string;
        let params: (number | string)[];

        // find function name and resolve first three channels
        if (format === RGB) {
            fnName = hasAlpha ? 'rgba' : RGB;
            params = [round(r), round(g), round(b)];
        } else if (format === HSL) {
            fnName = hasAlpha ? 'hsla' : HSL;
            params = [round(r), formatPercent(roundFloat(g, 100)), formatPercent(roundFloat(b, 100))];
        } else {
            throw new Error('Invalid color format');
        }

        // add alpha channel if needed
        if (hasAlpha) {
            params.push(formatFloat(roundFloat(a, 100000)));
        }

        // return as a string
        return cssFunction(fnName, params);
    }

    /**
     * Converts to hex rgb(255, 255, 255) to #FFFFFF
     */
    public toHexString(): string {
        const color = convertHelper(RGB, this);
        return '#' + (toHex(color.r) + toHex(color.g) + toHex(color.b)).toUpperCase();
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
        const _ = this;
        return (_.f === RGB ? _ : _.toRGB()).r;
    }

    public green(): number {
        const _ = this;
        return (_.f === RGB ? _ : _.toRGB()).g;
    }

    public blue(): number {
        const _ = this;
        return (_.f === RGB ? _ : _.toRGB()).b;
    }

    public hue(): number {
        const _ = this;
        return (_.f === HSL ? _ : _.toHSL()).r;
    }

    public saturation(): number {
        const _ = this;
        return (_.f === HSL ? _ : _.toHSL()).g;
    }

    public lightness(): number {
        const _ = this;
        return (_.f === HSL ? _ : _.toHSL()).b;
    }

    public alpha(): number {
        return this.a;
    }

    public opacity(): number {
        return this.a;
    }

    public invert(): ColorHelper {
        const _ = this;
        const color2 = convertHelper(RGB, _);
        return convertHelper(_.f, new ColorHelper(RGB, 255 - color2.r, 255 - color2.g, 255 - color2.b, _.a, _.o));
    }

    public lighten(percent: string | number, relative?: boolean): ColorHelper {
        const _ = this;
        const color2 = convertHelper(HSL, _);
        const max = maxChannelValues.l;
        const l = color2.b + (relative ? max - color2.b : max) * ensurePercent(percent);
        return convertHelper(_.f, new ColorHelper(HSL, color2.r, color2.g, l, _.a, _.o));
    }

    public darken(percent: string | number, relative?: boolean): ColorHelper {
        const _ = this;
        const color2 = convertHelper(HSL, _);
        const l = color2.b - (relative ? color2.b : maxChannelValues.l) * ensurePercent(percent);
        return convertHelper(_.f, new ColorHelper(HSL, color2.r, color2.g, l, _.a, _.o));
    }

    public saturate(percent: string | number, relative?: boolean): ColorHelper {
        const _ = this;
        const color2 = convertHelper(HSL, _);
        const max = maxChannelValues.s;
        const s = color2.g + (relative ? max - color2.g : max) * ensurePercent(percent);
        return convertHelper(_.f, new ColorHelper(HSL, color2.r, s, color2.b, _.a, _.o));
    }

    public desaturate(percent: string | number, relative?: boolean): ColorHelper {
        const _ = this;
        const color2 = convertHelper(HSL, _);
        const max = maxChannelValues.s;
        const s = color2.g - (relative ? color2.g : max) * ensurePercent(percent);
        return convertHelper(_.f, new ColorHelper(HSL, color2.r, s, color2.b, _.a, _.o));
    }

    public grayscale() {
        return this.desaturate(1);
    }

    public fade(percent: string | number): ColorHelper {
        const _ = this;
        const a = clampColor('a', ensurePercent(percent));
        return convertHelper(_.f, new ColorHelper(_.f, _.r, _.g, _.b, a, true));
    }

    public fadeOut(percent: string | number, relative?: boolean): ColorHelper {
        const _ = this;
        const max = 1;
        const a = clampColor('a', _.a - (relative ? _.a : max) * ensurePercent(percent));
        return convertHelper(_.f, new ColorHelper(_.f, _.r, _.g, _.b, a, true));
    }

    public fadeIn(percent: string | number, relative?: boolean): ColorHelper {
        const _ = this;
        const max = 1;
        const a = clampColor('a', _.a + (relative ? _.a : max) * ensurePercent(percent));
        return convertHelper(_.f, new ColorHelper(_.f, _.r, _.g, _.b, a, true));
    }

    public mix(mixin: CSSColor | ColorHelper, weight?: number): ColorHelper {
        const _ = this;
        const color2 = ensureColor(mixin);
        const g = convertHelper(RGB, _);
        const b = convertHelper(RGB, color2);
        const p = weight === undefined ? 0.5 : weight;
        const w = 2 * p - 1;
        const a = Math.abs(g.a- b.a);
        const w1 = ((w * a === -1 ? w : (w + a) / (1 + w * a)) + 1) / 2.0;
        const w2 = 1 - w1;

        const helper = new ColorHelper(
            RGB,
            round(g.r * w1 + b.r * w2),
            round(g.g * w1 + b.g * w2),
            round(g.b * w1 + b.b * w2),
            g.a * p + b.a * (1 - p),
            _.o || color2.o
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
        const _ = this;
        const color2 = convertHelper(HSL, _);
        return convertHelper(_.f, new ColorHelper(HSL, modDegrees(color2.r + degrees), color2.g, color2.b, _.a, _.o));
    }
}

function toHex(n: number): string {
    const i = round(n);
    return (i < 16 ? '0' : '') + i.toString(16);
}

function modDegrees(n: number): number {
    // note: maybe there is a way to simplify this
    return ((n < 0 ? 360 : 0) + n % 360) % 360;
}

function RGBtoHSL(r: number, g: number, b: number, a: number, hasAlpha: boolean): ColorHelper {
    const newR = r / 255;
    const newG = g / 255;
    const newB = b / 255;
    const min = Math.min(newR, newG, newB);
    const max = Math.max(newR, newG, newB);
    const l = (min + max) / 2;
    const delta = max - min;

    let h: number;
    if (max === min) {
        h = 0;
    } else if (newR === max) {
        h = (newG - newB) / delta;
    } else if (newG === max) {
        h = 2 + (newB - newR) / delta;
    } else if (newB === max) {
        h = 4 + (newR - newG) / delta;
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

    return new ColorHelper(HSL, h, s, l, a, hasAlpha);
}

function HSLtoRGB(r: number, g: number, b: number, a: number, hasAlpha: boolean): ColorHelper {
    const newH = r / 360;
    const newS = g;
    const newL = b;

    if (newS === 0) {
        const val = newL * 255;
        return new ColorHelper(RGB, val, val, val, a, hasAlpha);
    }

    const t2 = newL < 0.5 ? newL * (1 + newS) : newL + newS - newL * newS;
    const t1 = 2 * newL - t2;

    let newR = 0,
        newG = 0,
        newB = 0;
    for (let i = 0; i < 3; i++) {
        let t3 = newH + 1 / 3 * -(i - 1);
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
            newR = val;
        } else if (i === 1) {
            newG = val;
        } else {
            newB = val;
        }
    }

    return new ColorHelper(RGB, newR, newG, newB, a, hasAlpha);
}

function clampColor(channel: keyof typeof maxChannelValues, value: number): number {
    const min = 0;
    const max = maxChannelValues[channel];
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
    const isRGB = fn === RGB;
    const isHSL = fn === HSL;
    const hasAlpha = isHSLA || isRGBA;

    let type: 'rgb' | 'hsl';
    if (isRGB || isRGBA) {
        type = RGB;
    } else if (isHSL || isHSLA) {
        type = HSL;
    } else {
        throw new Error('unsupported color string');
    }

    const r = toFloat(cssParts[1]);
    const g = isRGB || isRGBA ? toFloat(cssParts[2]) : ensurePercent(cssParts[2]);
    const b = isRGB || isRGBA ? toFloat(cssParts[3]) : ensurePercent(cssParts[3]);
    const a = hasAlpha ? toFloat(cssParts[4]) : 1;

    return new ColorHelper(type, r, g, b, a, hasAlpha);
}
