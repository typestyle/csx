import { List } from '../types';

const functionExpression = /[\s]*([a-z-]+)[\s]*\([\s]*([^\)]+)[\s]*\)[\s]*/i; 
const floatExpression = /^(\-?\d+\.?\d{0,5})/;

export const formatUnit = <T>(unit: string) => (val: number) => (val + unit) as any as T;

export function ensurePercent(value: string | number): number {
  return typeof value === 'number'
    ? value as number
    : parseFloat(value) * .01;
}

export function formatPercent(value: number): string {
  return (formatFloat(value * 100)) + '%'
}

/**
 * Returns a number formatted to a max number of 5 decimal places
 */
export function formatFloat(n: number) { 
  return floatExpression.exec(n.toString())![1]
}

export function ensureLength(value: number | string | undefined): string | undefined {
  if (value === null || value === undefined) {
    return undefined;
  }
  
  // convert to number
  const number = +value;
  // validate conversion worked (NaN will not equal NaN)
  if (number === number) {
    return value + 'px';
  } 
  return value as string;
}

export function parseCSSFunction(stringValue: string): string[] | undefined {
  const matches = functionExpression.exec(stringValue);
  if (!matches || !matches.length) {
    return undefined;
  }
  return [matches[1]].concat(matches[2].split(','));
}

export function cssFunction(functionName: string, params: List<string|number>): string {
  const parts = Array.prototype.join.call(params, ',');
  return `${functionName}(${parts})`;
}