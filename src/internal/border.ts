import { ensureLength } from '../utils';
import { CSSColor, CSSLength, CSSLineStyle } from 'typestyle/lib/types';
import { BoxFunction, BorderOptions } from '../types';
import { params } from './lists'; 

/**
 * Returns the value with '' around it.  Any 's will be escaped \' in the output
 */
export function border(p: BorderOptions): string {
  return params(p.color, p.style, ensureLength(p.width));
}
 
export const borderColor = params as BoxFunction<CSSColor>;
export const borderStyle = params as BoxFunction<CSSLineStyle>; 

export const borderWidth = params as BoxFunction<CSSLength>;