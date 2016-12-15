import { CSSHelper } from './interfaces';

export function quote(val: string): string {
    return `'${val}'`;
}

export function important(val: number): string;
export function important(val: CSSHelper<string>): string;
export function important<T extends string>(val: T): T;
export function important<T extends string>(val: number | T | CSSHelper<string>): string {
    if (!val && val !== 0) {
        return '';
    }
    return `${val.toString()} !important`;
}