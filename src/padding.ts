import { BoxFunction, CSSLength, CSSPercentage } from './types';
import { PaddingProperty } from 'csstype';
import { params } from './lists'; 
  
export const padding = params as BoxFunction<PaddingProperty<CSSLength | CSSPercentage>>;
