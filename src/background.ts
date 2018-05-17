import { List, CsxBackgroundOptions } from './types'; 
import { isDefined, isNotEmpty } from './utils/inspect';
import { map } from './utils/arrays';



/**
 * Creates a `background` shorthand value. You can supply multiple backgrounds, but the `background-color` can only be defined on the last background, as there is only one background color for an element.
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/background
 */
export function background(...backgrounds: CsxBackgroundOptions[]): string;
export function background(): string {
    return map(arguments as List<CsxBackgroundOptions>, (background: CsxBackgroundOptions) => {
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
