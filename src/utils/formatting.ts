import { CSSHelper } from '../interfaces';

export function ensurePercent(value: string | number): number {
  return typeof value === 'number'
    ? value as number
    : parseFloat(ensureString(value)) * .01;
}

export function ensureString(x: any): string {
  return typeof (x as CSSHelper<string>).type === 'string'
    ? x.toString()
    : x as string;
}

export function formatPercent(value: number): string {
  return (value * 100) + '%'
}

export function parseCSSFunction(stringValue: string): string[] | undefined {
  const matches = /[\s]*([a-z-]+)[\s]*\([\s]*([^\)]+)[\s]*\)[\s]*/ig.exec(stringValue);
  if (!matches || !matches.length) {
    return undefined;
  }
  return [matches[1]].concat(matches[2].split(','));
}

export function cssFunction(functionName: string, params: (string|number|CSSHelper<string>)[]): string {
  const parts = params.map(ensureString).join(',');
  return `${functionName}(${parts})`;
}