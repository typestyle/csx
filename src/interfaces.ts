import { CSSColor, CSSPercentage, CSSLength } from 'typestyle/lib/types';

export type CsxColorStop = [CSSColor | StringType<CSSColor>, CSSPercentage | CSSLength];

export interface StringType<T extends string> {
    toString(): T;
}
