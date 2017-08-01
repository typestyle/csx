import { CSSImage, CSSPosition, CSSLength, CSSPercentage, CSSRepeatStyle, CSSBox, CSSColor } from 'typestyle/lib/types';
import { map } from '../utils';
import { List } from '../types';

export type CsxBackground = {
    image?: CSSImage;
    position?: CSSPosition;
    size?: 'auto' | 'cover' | 'contain' | CSSLength | CSSPercentage;
    repeat?: CSSRepeatStyle;
    origin?: CSSBox;
    clip?: 'border-box' | 'padding-box' | 'content-box' | 'text';
    attachment?: 'scroll' | 'fixed' | 'local'
    color?: CSSColor;
};

/**
 * Creates a `background` shorthand value. You can supply multiple backgrounds, but the `background-color` can only be defined on the last background, as there is only one background color for an element.
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/background
 */
export function background(...backgrounds: CsxBackground[]): string;
export function background(): string {
    return map(arguments as List<CsxBackground>, (background: CsxBackground) => {
        let s = '';
        if (background.image) {
            s += ` ${background.image}`;
        }
        if (background.position) {
            s += ` ${background.position}`;
        }
        if (background.size || background.size === 0) {
            s += ` ${background.size}`;
        }
        if (background.repeat) {
            s += ` ${background.repeat}`;
        }
        if (background.origin) {
            s += ` ${background.origin}`;
        }
        if (background.clip) {
            s += ` ${background.clip}`;
        }
        if (background.attachment) {
            s += ` ${background.attachment}`;
        }
        if (background.color) {
            s += ` ${background.color}`;
        }
        return s.trim();
    })
    .filter(s => s !== '')
    .join(',');
}
