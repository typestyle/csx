import { CSSImage, CSSPosition, CSSLength, CSSPercentage, CSSRepeatStyle, CSSBox, CSSColor } from 'typestyle/lib/types';
import { map } from '../utils';
import { List } from '../types';
import { isDefined, isNotEmpty } from '../utils/inspect';

export type CsxBackground = {
    image?: CSSImage;
    position?: CSSPosition;
    size?: 'auto' | 'cover' | 'contain' | CSSLength | CSSPercentage;
    repeat?: CSSRepeatStyle;
    origin?: CSSBox;
    clip?: 'border-box' | 'padding-box' | 'content-box' | 'text';
    attachment?: 'scroll' | 'fixed' | 'local';
    color?: CSSColor;
};

/**
 * Creates a `background` shorthand value. You can supply multiple backgrounds, but the `background-color` can only be defined on the last background, as there is only one background color for an element.
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/background
 */
export function background(...backgrounds: CsxBackground[]): string;
export function background(): string {
    return map(arguments as List<CsxBackground>, (background: CsxBackground) => {
        return [
            background.image,
            background.position,
            background.size,
            background.repeat,
            background.origin,
            background.clip,
            background.attachment,
            background.color
        ]
            .filter(isDefined)
            .join(' ');
    })
        .filter(isNotEmpty)
        .join(',');
}
