import { List } from '../types';

export const filter = <T>(args: List<T>, condition: (item: T) => boolean): T[] => {
  return Array.prototype.filter.call(args, condition);
}

export const map = <TInput, TOutput>(args: List<TInput>, mapper: (item: TInput) => TOutput): TOutput[] => {
  return Array.prototype.map.call(args, mapper);
}