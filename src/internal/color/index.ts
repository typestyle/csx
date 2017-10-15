
// core imports
export { ColorHelper, color } from './color-helper'

// formatters
import './to-string'
import './to-hex-string'

// ColorHelper optional functions
import './darken'
import './desaturate'
import './fade-in'
import './fade-out'
import './fade' 
import './grayscale' 
import './invert'
import './lighten'
import './mix'
import './saturate'
import './shade'
import './spin'
import './tint'

// parsers
import './parse-color-function'
import './parse-hex-code'

// parse-named-color requires ALL named colors, increasing build size significantly
import './parse-named-color'

// export color creators
export { hsl } from './hsl'
export { hsla } from './hsla'
export { rgb } from './rgb'
export { rgba } from './rgba'

// color keywords
export * from './names'
