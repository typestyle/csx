import { CSSHelper } from './interfaces';

export function quote(val: string): string {
    return `'${val}'`;
}

export function important<T extends string>(val: number | string | CSSHelper<T>): string | CSSHelper<T> {
    if (!val && val !== 0) {
        return '';
    }
    if (typeof (val as CSSHelper<T>).type === 'string') {
        const helper = val as CSSHelper<T>;
        return {
            type: helper.type,
            toString() {
                return `${helper.toString()} !important`;
            }
        };
    }
    // if (typeof val === 'number') {
    //     return `${val}px !important`;
    // }
    return `${val.toString()} !important`;
}