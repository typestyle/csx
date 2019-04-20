import { WidthProperty, BorderBlockStartStyleProperty, BackgroundImageProperty, BackgroundPositionProperty, BackgroundSizeProperty, BackgroundRepeatProperty, BackgroundOriginProperty, BackgroundClipProperty, BackgroundAttachmentProperty, BorderStyleProperty, BorderWidthProperty, Globals, BackgroundColorProperty, BorderColorProperty } from 'csstype';

export type CSSAngle = WidthProperty<string | number>;
export type CSSLength = WidthProperty<string | number>;
export type CSSPercentage = WidthProperty<string | number>;
export type CsxColorStop = [string | StringType<string>, CSSPercentage | CSSLength];
export type CSSTransformFunction = string;
export type CSSLineStyle = BorderBlockStartStyleProperty;

export interface CsxBackgroundNoSizeOptions {
    attachment?: BackgroundAttachmentProperty;
    clip?: BackgroundClipProperty;
    color?: BackgroundColorProperty;
    image?: BackgroundImageProperty;
    origin?: BackgroundOriginProperty;
    position?: BackgroundPositionProperty<CSSLength>;
    repeat?: BackgroundRepeatProperty;
}

export interface CsxBackgroundWithSizeOptions
    extends CsxBackgroundNoSizeOptions {
    position: BackgroundPositionProperty<CSSLength>;
    size?: BackgroundSizeProperty<CSSLength>;
}

export type CsxBackgroundOptions =
    | CsxBackgroundNoSizeOptions
    | CsxBackgroundWithSizeOptions;

export type CSSSideOrCorner =
| 'to left' | 'to right' | 'to top' | 'to bottom'
| 'left top' | 'right top' | 'left bottom' | 'right bottom'
| 'top left' | 'top right' | 'bottom left' | 'bottom right'
| 'to left top' | 'to right top' | 'to left bottom' | 'to right bottom'
| 'to top left' | 'to top right' | 'to bottom left' | 'to bottom right';

export type CSSGradient = Globals | string;

export interface StringType<T extends string> {
    toString(): T;
}

export interface List<T> {
    length: number;
    [index: number]: T;
}

export interface BorderOptions {
    color?: BorderColorProperty;
    style?: BorderStyleProperty;
    width?: BorderWidthProperty<CSSLength>;
}

export interface BoxFunction<T> {
    (allSides: T): string;
    (top: T, rightLeft: T, bottom: T): string;
    (topBottom: T, rightLeft: T): string;
    (top: T, right: T, bottom: T, left: T): string;
}
