import * as names from './names'
import { ColorHelper, colorParsers } from './color-helper' 

/**
 * Named colors in the CSS spec. They must be loaded after exported functions and constructor
 *
 */
const namedColors: Record<keyof typeof names, ColorHelper> = names

export function parseNamedColor(stringValue: string): ColorHelper | undefined {
    return namedColors[stringValue as any as keyof typeof names]
}

// add to parsers
colorParsers.push(parseNamedColor)