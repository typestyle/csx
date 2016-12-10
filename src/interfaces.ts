/**
 * All helpers that use fluent mapping should implement this interface. 
 * This interface can be used by typestyle and other CSS in JS libraries
 * to get the serialized string value of the CSS property
 */
export interface CSSHelper<T extends string> {
  type: T;
  toString(): string;
}
