import { CSSTransformFunction, CSSLength, CSSPercentage } from 'typestyle/lib/types';
import { cssFunction as f } from '../utils';

/**
 * The CSS transform property lets you modify the coordinate space of the CSS visual formatting model. Using it, elements can be translated, rotated, scaled, and skewed.
 * Returns the transforms as a delimited string by space or returns 'none' if no arguments are provided
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/transform
 */
export function transform(...transforms: CSSTransformFunction[]): CSSTransformFunction {
    return transforms.length ? transforms.join(' ') : 'none';
}

/**
 * The matrix() CSS function specifies a homogeneous 2D transformation matrix comprised of the specified six values. The constant values of such matrices are implied and not passed as parameters; the other parameters are described in the column-major order.
 * 
 * matrix(a, b, c, d, tx, ty) is a shorthand for matrix3d(a, b, 0, 0, c, d, 0, 0, 0, 0, 1, 0, tx, ty, 0, 1).
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/matrix
 */
export function matrix(a: number, b: number, c: number, d: number, tx: number, ty: number): CSSTransformFunction {
    return f('matrix', [a, b, c, d, tx, ty]);
}

/**
 * The matrix3d() CSS function describes a 3D transform as a 4x4 homogeneous matrix. The 16 parameters are described in the column-major order.
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/matrix3d
 */
export function matrix3d(a1: number, b1: number, c1: number, d1: number, a2: number, b2: number, c2: number, d2: number, a3: number, b3: number, c3: number, d3: number, a4: number, b4: number, c4: number, d4: number): CSSTransformFunction {
    return f('matrix3d', [a1, b1, c1, d1, a2, b2, c2, d2, a3, b3, c3, d3, a4, b4, c4, d4]);
}

/**
 * The perspective() CSS function defines the distance between the z=0 plane and the user in order to give to the 3D-positioned element some perspective. Each 3D element with z>0 becomes larger; each 3D-element with z<0 becomes smaller. The strength of the effect is determined by the value of this property.
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/perspective
 */
export function perspective(value: CSSLength): CSSTransformFunction {
    return f('perspective', [value]);
}

/**
 * The rotate() CSS function defines a transformation that moves the element around a fixed point (as specified by the transform-origin property) without deforming it. The amount of movement is defined by the specified angle; if positive, the movement will be clockwise, if negative, it will be counter-clockwise. A rotation by 180° is called point reflection.
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotate
 */
export function rotate(z: CSSPercentage): CSSTransformFunction {
    return f('rotate', [z]);
}

/**
 * The rotate3d()CSS function defines a transformation that moves the element around a fixed axis without deforming it. The amount of movement is defined by the specified angle; if positive, the movement will be clockwise, if negative, it will be counter-clockwise.In opposition to rotations in the plane, the composition of 3D rotations is usually not commutative; it means that the order in which the rotations are applied is crucial.
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotate3d
 */
export function rotate3d(x: CSSPercentage, y: CSSPercentage, z: CSSPercentage): CSSTransformFunction {
    return f('rotate3d', [x, y, z]);
}

/**
 * The rotateX()CSS function defines a transformation that moves the element around the abscissa without deforming it. The amount of movement is defined by the specified angle; if positive, the movement will be clockwise, if negative, it will be counter-clockwise. The axis of rotation passes by the origin, defined by transform-origin CSS property.
 * 
 * rotateX(a)is a shorthand for rotate3d(1, 0, 0, a).
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotateX
 */
export function rotateX(x: CSSPercentage): CSSTransformFunction {
    return f('rotateX', [x]);
}

/**
 * The rotateY()CSS function defines a transformation that moves the element around the ordinate without deforming it. The amount of movement is defined by the specified angle; if positive, the movement will be clockwise, if negative, it will be counter-clockwise. The axis of rotation passes by the origin, defined by transform-origin CSS property.
 * 
 * rotateY(a)is a shorthand for rotate3d(0, 1, 0, a).
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotateY
 */
export function rotateY(y: CSSPercentage): CSSTransformFunction {
    return f('rotateY', [y]);
}

/**
 * The rotateZ()CSS function defines a transformation that moves the element around the z-axis without deforming it. The amount of movement is defined by the specified angle; if positive, the movement will be clockwise, if negative, it will be counter-clockwise. The axis of rotation passes by the origin, defined by transform-origin CSS property.
 * 
 * rotateZ(a)is a shorthand for rotate3d(0, 0, 1, a).
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotateZ
 */
export function rotateZ(z: CSSPercentage): CSSTransformFunction {
    return f('rotateZ', [z]);
}

/**
 * The scale() CSS function modifies the size of the element. It can either augment or decrease its size and as the amount of scaling is defined by a vector, it can do so more in one direction than in another one. This transformation is characterized by a vector whose coordinates define how much scaling is done in each direction. If both coordinates of the vector are equal, the scaling is uniform, or isotropic, and the shape of the element is preserved. In that case, the scaling function defines a homothetic transformation.
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/scale
 */
export function scale(x: number, y?: number): CSSTransformFunction {
    return f('scale', (y || y === 0) ? [x, y] : [x]);
}

/**
 * The scale3d() CSS function modifies the size of an element. Because the amount of scaling is defined by a vector, it can resize different dimensions at different scales. This transformation is characterized by a vector whose coordinates define how much scaling is done in each direction. If all three coordinates of the vector are equal, the scaling is uniform, or isotropic, and the shape of the element is preserved. In that case, the scaling function defines a homothetic transformation.
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/scale3d
 */
export function scale3d(x: number, y: number, z: number): CSSTransformFunction {
    return f('scale3d', [x, y, z]);
}

/**
 * The scaleX() CSS function modifies the abscissa of each element point by a constant factor, except if this scale factor is 1, in which case the function is the identity transform. The scaling is not isotropic and the angles of the element are not conserved. scaleX(-1) defines an axial symmetry with a vertical axis passing by the origin (as specified by the transform-origin property).
 * 
 * scaleX(sx) is a shorthand for scale(sx, 1) or for scale3d(sx, 1, 1).
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/scaleX
 */
export function scaleX(x: number): CSSTransformFunction {
    return f('scaleX', [x]);
}

/**
 * The scaleY() CSS function modifies the ordinate of each element point by a constant factor except if this scale factor is 1, in which case the function is the identity transform. The scaling is not isotropic and the angles of the element are not conserved. scaleY(-1) defines an axial symmetry with a horizontal axis passing by the origin (as specified by the transform-origin property).
 * 
 * scaleY(sy) is a shorthand for scale(1, sy) or for scale3d(1, sy, 1).
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/scaleY
 */
export function scaleY(y: number): CSSTransformFunction {
    return f('scaleY', [y]);
}

/**
 * The scaleZ() CSS function modifies the z-coordinate of each element point by a constant factor, except if this scale factor is 1, in which case the function is the identity transform. The scaling is not isotropic and the angles of the element are not conserved. scaleZ(-1) defines an axial symmetry along the z-axis passing by the origin (as specified by the transform-origin property).
 * 
 * scaleZ(sz) is a shorthand for scale3d(1, 1, sz).
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/scaleZ
 */
export function scaleZ(z: number): CSSTransformFunction {
    return f('scaleZ', [z]);
}

/**
 * The skew() CSS function is a shear mapping, or transvection, distorting each point of an element by a certain angle in each direction. It is done by increasing each coordinate by a value proportionate to the specified angle and to the distance to the origin. The more far from the origin, the more away the point is, the greater will be the value added to it.
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/skew
 */
export function skew(x: CSSPercentage, y?: CSSPercentage): CSSTransformFunction {
    return f('skew', (y || y === 0) ? [x, y] : [x]);
}

/**
 * The skewX() CSS function is a horizontal shear mapping distorting each point of an element by a certain angle in the horizontal direction. It is done by increasing the abscissa coordinate by a value proportionate to the specified angle and to the distance to the origin. The more far from the origin, the more away the point is, the greater will be the value added to it.
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/skewX
 */
export function skewX(x: CSSPercentage): CSSTransformFunction {
    return f('skewX', [x]);
}

/**
 * The skewY() CSS function is a vertical shear mapping distorting each point of an element by a certain angle in the vertical direction. It is done by increasing the ordinate coordinate by a value proportionate to the specified angle and to the distance to the origin. The more far from the origin, the more away the point is, the greater will be the value added to it.
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/skewY
 */
export function skewY(y: CSSPercentage): CSSTransformFunction {
    return f('skewY', [y]);
}

/**
 * The translate() CSS function moves the position of the element on the plane. This transformation is characterized by a vector whose coordinates define how much it moves in each direction.
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translate
 */
export function translate(x: CSSLength | CSSPercentage, y?: CSSLength | CSSPercentage): CSSTransformFunction {
    return f('translate', (y || y === 0) ? [x, y] : [x]);
}

/**
 * The translate3d() CSS function moves the position of the element in the 3D space. This transformation is characterized by a 3-dimension vector whose coordinates define how much it moves in each direction.
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translate3d
 */
export function translate3d(x: CSSLength | CSSPercentage, y: CSSLength | CSSPercentage, z: CSSLength | CSSPercentage): CSSTransformFunction {
    return f('translate3d', [x, y, z]);
}

/**
 * The translateX() CSS function moves the element horizontally on the plane. This transformation is characterized by a <length> defining how much it moves horizontally.
 *
 * translateX(tx) is a shortcut for translate(tx, 0).
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translateX
 */
export function translateX(x: CSSLength | CSSPercentage): CSSTransformFunction {
    return f('translateX', [x]);
}

/**
 * The translateY() CSS function moves the element vertically on the plane. This transformation is characterized by a <length> defining how much it moves vertically.
 *
 * translateY(ty) is a shortcut for translate(0, ty).
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translateY
 */
export function translateY(y: CSSLength | CSSPercentage): CSSTransformFunction {
    return f('translateY', [y]);
}

/**
 * The translateZ() CSS function moves the element along the z-axis of the 3D space. This transformation is characterized by a <length> defining how much it moves.
 * 
 * translateZ(tz) is a shorthand for translate3d(0, 0, tz).
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translateZ
 */
export function translateZ(z: CSSLength | CSSPercentage): CSSTransformFunction {
    return f('translateZ', [z]);
}
