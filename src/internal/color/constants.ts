export const RGB = 0,
    HSL = 1,
    R = 0,
    G = 1,
    B = 2,
    H = 0,
    S = 1,
    L = 2,
    A = 3

/**
 * Describe the ceiling for each color channel for each format
 */
export const maxChannelValues = {
    [RGB]: [255, 255, 255, 1],
    [HSL]: [360, 1, 1, 1]
}
