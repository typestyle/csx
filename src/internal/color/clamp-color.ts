import { maxChannelValues } from './constants'

export function clampColor(format: number, channel: number, value: number): number {
    const val = value || 0
    const min = 0
    const max = maxChannelValues[format][channel]
    return val < min ? min : val > max ? max : val
}
