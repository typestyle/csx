import { CSSLength, CSSPercentage } from 'typestyle/lib/types';

/**
 * Returns the number with a suffix of %
 */
export function percent(val: number): CSSPercentage {
  return `${val}%`;
}

/**
 * Returns the number with a suffix of px
 */
export function px(val: number): CSSLength {
  return `${val}px`;
}

/**
 * Returns the number with a suffix of em
 */
export function em(val: number): CSSLength {
  return `${val}em`;
}

/**
 * Returns the number with a suffix of rad
 */
export function rad(val: number): CSSLength {
  return `${val}rad`;
}

/**
 * Returns the number with a suffix of rem
 */
export function rem(val: number): CSSLength {
  return `${val}rem`;
}

/**
 * Returns the number with a suffix of vh
 */
export function viewHeight(val: number): CSSLength {
  return `${val}vh`;
}

/**
 * Returns the number with a suffix of vw
 */
export function viewWidth(val: number): CSSLength {
  return `${val}vw`;
}

/**
 * Returns the number with a suffix of turn
 */
export function turn(val: number): CSSLength {
  return `${val}turn`;
}
