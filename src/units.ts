import { formatUnit } from './utils/formatting';
import { CSSPercentage, CSSAngle, CSSLength } from './types';

/**
 * Returns the number with a suffix of %
 */
export const percent = formatUnit<CSSPercentage>('%');

/**
 * Returns the number with a suffix of deg
 */
export const deg = formatUnit<CSSAngle>('deg');

/**
 * Returns the number with a suffix of em
 */
export const em = formatUnit<CSSLength>('em');

/**
 * Returns the number with a suffix of px
 */
export const px = formatUnit<CSSLength>('px');

/**
 * Returns the number with a suffix of rad
 */
export const rad = formatUnit<CSSAngle>('rad');

/**
 * Returns the number with a suffix of rem
 */
export const rem = formatUnit<CSSLength>('rem');

/**
 * Returns the number with a suffix of vh
 */
export const viewHeight = formatUnit<CSSLength>('vh');

/**
 * Returns the number with a suffix of vw
 */
export const viewWidth = formatUnit<CSSLength>('vw');

/**
 * Returns the number with a suffix of turn
 */
export const turn = formatUnit<CSSAngle>('turn');
