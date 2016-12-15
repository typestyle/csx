import { CSSHelper } from './interfaces';

export function quote(val: number): string;
export function quote(val: string): string;
export function quote(val: CSSHelper<string>): string;
export function quote(val: number | string | CSSHelper<string>): string {
  const val2 = (val || val === 0 ? val.toString() : '')
    .replace(/\'/g, "\\'");
  return `'${val2}'`;
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