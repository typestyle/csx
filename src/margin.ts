import { BoxFunction, CSSLength, CSSPercentage } from './types';
import { MarginProperty } from 'csstype';
import { params } from './lists'; 
  
export const margin = params as BoxFunction<MarginProperty<CSSLength | CSSPercentage>>;
