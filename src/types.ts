import { CSSColor, CSSPercentage, CSSLength, CSSLineStyle } from 'typestyle/lib/types';

export type CsxColorStop = [CSSColor | StringType<CSSColor>, CSSPercentage | CSSLength];

export interface StringType<T extends string> {
    toString(): T;
}

export interface List<T> {
    length: number;
    [index: number]: T;
}

export interface BorderOptions {
    color?: CSSColor,
    style?: CSSLineStyle,
    width?: CSSLength | 'thin' | 'medium' | 'thick'
}

export interface BoxFunction<T> {
  (allSides: T): string;
  (top: T, rightLeft: T, bottom: T): string;
  (topBottom: T, rightLeft: T): string;
  (top: T, right: T, bottom: T, left: T): string;
}