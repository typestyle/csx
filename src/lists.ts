import { StringType } from './interfaces';

export function list(...items: (number | string | StringType<string>)[]): string {
  return (items || [])
    .filter(s => s || s === 0)
    .map(s => s.toString())
    .join(',');
}
