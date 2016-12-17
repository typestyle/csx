
export function ensurePercent(value: string | number): number {
  return typeof value === 'number'
    ? value as number
    : parseFloat(value) * .01;
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

export function cssFunction(functionName: string, params: (string|number)[]): string {
  const parts = params.join(',');
  return `${functionName}(${parts})`;
}