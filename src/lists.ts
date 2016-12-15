import { CSSHelper } from './interfaces';

export function list<T extends string>(...items: (number | string | CSSHelper<T>)[]): string {
  return (items || [])
    .filter(s => s || s === 0)
    .map(s => s.toString())
    .join(',');
}
