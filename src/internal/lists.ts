import { StringType } from '../types';
import { filter } from '../utils'
import { px } from "./units";

const delimited = (delimiter: string) => {
  return function () {
    return filter(arguments, s => s || s === 0)
      .map(s => typeof s === 'number' ? px(s) : s.toString())
      .join(delimiter);
  }
};

export const params = delimited(' ') as (...parameters: (undefined | number | string | StringType<string>)[]) => string;
export const list = delimited(',') as (...items: (undefined | number | string | StringType<string>)[]) => string;
