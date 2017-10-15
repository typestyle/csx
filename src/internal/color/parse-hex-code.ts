import { ColorHelper, colorParsers, createColor } from './color-helper'
import { RGB } from './constants' 

/**
 * 
 * @param stringValue 
 */
export function parseHexCode(stringValue: string): ColorHelper | undefined {
    const match = stringValue.match(/#(([a-f0-9]{6})|([a-f0-9]{3}))$/i)
    if (!match) {
        return undefined
    }

    const hex = match[1]
    const hexColor = parseInt(hex.length === 3 ? hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2] : hex, 16)
    const r = (hexColor >> 16) & 0xff
    const b = (hexColor >> 8) & 0xff
    const g = hexColor & 0xff

    return createColor(RGB, r, b, g, 1, false)
}

// add to parsers
colorParsers.push(parseHexCode)