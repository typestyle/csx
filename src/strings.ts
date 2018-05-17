/**
 * Returns the value with '' around it.  Any 's will be escaped \' in the output
 */
export function calc(exp: string): string {
  return `calc(${exp})`;
}

/**
 * Returns the value with '' around it.  Any 's will be escaped \' in the output
 */
export function quote(val: number | string): string {
  const val2 = (val || val === 0 ? val.toString() : '').replace(/\'/g, "\\'");
  return `'${val2}'`;
}

/**
 * Returns the value with !important on the end.  If the value provided is a CSSHelper, it will
 * be converted to a string
 */
export function important(val: number): string;
export function important<T extends string>(val: T): T;
export function important<T extends string>(val: number | T): string {
  if (!val && val !== 0) {
    return '';
  }
  return `${val.toString()} !important`;
}

/**
 * Returns the string in a url()
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/url
 */
export function url(val: string): string {
  return `url(${val || ''})`;
}
