import { CSSAngle, CSSColor, CSSSideOrCorner, CSSGradient } from 'typestyle/lib/types';
import { CsxColorStop, StringType } from '../types';
import { cssFunction } from '../utils';

/**
 * Helper for the linear-gradient function in CSS
 * https://drafts.csswg.org/css-images-3/#funcdef-linear-gradient
 */
export function linearGradient(position: CSSAngle | CSSSideOrCorner, ...colors: (CSSColor | StringType<CSSColor> | CsxColorStop)[]): CSSGradient {
  return cssFunction('linear-gradient', [position, ...colors.map(flattenColorStops)])
}

/**
 * Helper for the repeating-linear-gradient function in CSS
 * https://drafts.csswg.org/css-images-3/#funcdef-repeating-linear-gradient
 */
export function repeatingLinearGradient(position: CSSSideOrCorner, ...colors: (CSSColor | StringType<CSSColor>  | CsxColorStop)[]): CSSGradient {
  return cssFunction('repeating-linear-gradient', [position, ...colors.map(flattenColorStops)]);
}

/**
 * Single CSSColorStop => string conversion is like:
 * 'x'=>'x'
 * ['x', '50%'] => 'x 50%'
 **/
function flattenColorStops(c: CSSColor | StringType<CSSColor> | CsxColorStop): string {
  return Array.isArray(c) ? c.map(s => s.toString()).join(' ') : c.toString();
}
