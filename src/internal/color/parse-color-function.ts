import { RGB, HSL } from './constants'
import { ColorHelper, colorParsers, createColor } from './color-helper'
import { ensurePercent, parseCSSFunction } from '../../utils/formatting'

/**
 * 
 * @param colorString 
 */
export function parseColorFunction(colorString: string): ColorHelper | undefined {
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
  
    const c0 = parseFloat(cssParts[1]);
    const c1 = isRGB || isRGBA ? parseFloat(cssParts[2]) : ensurePercent(cssParts[2]);
    const c2 = isRGB || isRGBA ? parseFloat(cssParts[3]) : ensurePercent(cssParts[3]);
    const c3 = hasAlpha ? parseFloat(cssParts[4]) : 1;
  
    return createColor(type, c0, c1, c2, c3, hasAlpha);
  }
  
  // add to parsers
  colorParsers.push(parseColorFunction)