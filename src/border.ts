import { ensureLength } from './utils/formatting';
import { BoxFunction, BorderOptions, CSSLength } from './types';
import { params } from './lists'; 
import { BorderColorProperty, BorderStyleProperty, BorderWidthProperty } from 'csstype';

/**
 * Returns the value with '' around it.  Any 's will be escaped \' in the output
 */
export function border(p: BorderOptions): string {
  return params(p.color, p.style, ensureLength(p.width));
}
 
export const borderColor = params as BoxFunction<BorderColorProperty>;
export const borderStyle = params as BoxFunction<BorderStyleProperty>; 
export const borderWidth = params as BoxFunction<BorderWidthProperty<CSSLength>>;
