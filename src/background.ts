import { CsxBackgroundOptions, CsxBackgroundWithSizeOptions } from './types';
import { coalesce } from './strings';

/**
 * Creates a `background` shorthand value. You can supply multiple backgrounds, but the `background-color` can only be defined on the last background, as there is only one background color for an element.
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/background
 */
export function background(...backgrounds: CsxBackgroundOptions[]): string;
export function background(): string {
    let output = '';
    for (let i = 0; i < arguments.length; i++) {
        const background = arguments[i] as CsxBackgroundOptions;
        const backgroundSize = (background as CsxBackgroundWithSizeOptions).size
            ? '/' + (background as CsxBackgroundWithSizeOptions).size
            : '';
        const backgroundParts = [
            coalesce(background.image),
            coalesce(background.position) + backgroundSize,
            coalesce(background.repeat),
            coalesce(background.origin),
            coalesce(background.clip),
            coalesce(background.attachment),
            coalesce(background.color),
        ];
        const backgroundString = backgroundParts.filter(Boolean).join(' ');
        output += (output.length && backgroundString ? ', ' : '') + backgroundString;
    }
    return output;
}
