import { CSSImage, CSSPosition, CSSLength, CSSPercentage, CSSRepeatStyle, CSSBox, CSSColor } from 'typestyle/lib/types';

/**
 * Creates a `background` shorthand value.
 */
export function background(...backgrounds: {
    image?: CSSImage;
    position?: CSSPosition;
    size?: 'auto' | 'cover' | 'contain' | CSSLength | CSSPercentage;
    repeat?: CSSRepeatStyle;
    origin?: CSSBox;
    clip?: 'border-box' | 'padding-box' | 'content-box' | 'text';
    attachment?: 'scroll' | 'fixed' | 'local'
    color?: CSSColor;
}[]): string {
    return (backgrounds || [])
        .map(background => {
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
