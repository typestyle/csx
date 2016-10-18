/**
 * @module Provides useful `style` primitives
 * 
 * * -webkit- is needed for mobile safari (iPad)
 */

import { style, extend } from 'typestyle';

/** 
 * If you have more than one child prefer horizontal,vertical
 */
export var flexRoot: NestedCSSProperties = {
  display: [
    '-webkit-flex',
    'flex'
  ]
};

/**
 * A general grouping component that has no impact on the parent flexbox properties e.g.
 * <vertical>
 *    <pass>
 *       <content/>
 *    </pass>
 * </vertical>
 */
export var pass: NestedCSSProperties = {
  display: 'inherit',

  '-webkit-flex-direction': 'inherit',
  flexDirection: 'inherit',

  '-webkit-flex-grow': 1,
  flexGrow: 1,
}

export var inlineRoot: NestedCSSProperties = {
  display: 'inline-flex'
};

export const horizontal: NestedCSSProperties = extend(flexRoot, {
  '-webkit-flex-direction': 'row',
  flexDirection: 'row'
});
export const vertical: NestedCSSProperties = extend(flexRoot, {
  '-webkit-flex-direction': 'column',
  flexDirection: 'column'
});

export var wrap: NestedCSSProperties = {
  '-webkit-flex-wrap': 'wrap',
  flexWrap: 'wrap'
};

export var flexNone: NestedCSSProperties = {
  flex: 'none'
};

/**
 * If you want items to be sized automatically by their children use this
 * This is because of a bug in various flexbox implementations: http://philipwalton.com/articles/normalizing-cross-browser-flexbox-bugs/
 */
export var content: NestedCSSProperties = {
  '-webkit-flex-shrink': 0,
  flexShrink: 0
};

export var flex: NestedCSSProperties = {
  '-webkit-flex': 1,
  flex: 1
};

export var flex1: NestedCSSProperties = flex;
export var flex2: NestedCSSProperties = {
  '-webkit-flex': 2,
  flex: 2
};
export var flex3: NestedCSSProperties = {
  '-webkit-flex': 3,
  flex: 3
};
export var flex4: NestedCSSProperties = {
  '-webkit-flex': 4,
  flex: 4
};
export var flex5: NestedCSSProperties = {
  '-webkit-flex': 5,
  flex: 5
};
export var flex6: NestedCSSProperties = {
  '-webkit-flex': 6,
  flex: 6
};
export var flex7: NestedCSSProperties = {
  '-webkit-flex': 7,
  flex: 7
};
export var flex8: NestedCSSProperties = {
  '-webkit-flex': 8,
  flex: 8
};
export var flex9: NestedCSSProperties = {
  '-webkit-flex': 9,
  flex: 9
};
export var flex10: NestedCSSProperties = {
  '-webkit-flex': 10,
  flex: 10
};
export var flex11: NestedCSSProperties = {
  '-webkit-flex': 11,
  flex: 11
};
export var flex12: NestedCSSProperties = {
  '-webkit-flex': 12,
  flex: 12
};

/////////////////////////////
// Alignment in cross axis //
/////////////////////////////

export var start: NestedCSSProperties = {
  '-webkit-align-items': 'flex-start',
  alignItems: 'flex-start'
};
export var center: NestedCSSProperties = {
  '-webkit-align-items': 'center',
  alignItems: 'center'
};
export var end: NestedCSSProperties = {
  '-webkit-align-items': 'flex-end',
  alignItems: 'flex-end'
};

////////////////////////////
// Alignment in main axis //
////////////////////////////

export var startJustified: NestedCSSProperties = {
  '-webkit-justify-content': 'flex-start',
  justifyContent: 'flex-start'
};
export var centerJustified: NestedCSSProperties = {
  '-webkit-justify-content': 'center',
  justifyContent: 'center'
};
export var endJustified: NestedCSSProperties = {
  '-webkit-justify-content': 'flex-end',
  justifyContent: 'flex-end'
};
export var aroundJustified: NestedCSSProperties = {
  '-webkit-justify-content': 'space-around',
  justifyContent: 'space-around'
};
export var betweenJustified: NestedCSSProperties = {
  '-webkit-justify-content': 'space-between',
  justifyContent: 'space-between'
};

////////////////////////////
// Alignment in both axes //
////////////////////////////

export var centerCenter: NestedCSSProperties = extend(flexRoot, center, centerJustified);

////////////////////
// Self alignment //
////////////////////

export var selfStart: NestedCSSProperties = {
  '-webkit-align-self': 'flex-start',
  alignSelf: 'flex-start'
};
export var selfCenter: NestedCSSProperties = {
  '-webkit-align-self': 'center',
  alignSelf: 'center'
};
export var selfEnd: NestedCSSProperties = {
  '-webkit-align-self': 'flex-end',
  alignSelf: 'flex-end'
};
export var selfStretch: NestedCSSProperties = {
  '-webkit-align-self': 'stretch',
  alignSelf: 'stretch'
};

//////////////////
// Other layout //
//////////////////

export var block: NestedCSSProperties = {
  display: 'block'
};

export var none: NestedCSSProperties = {
  display: 'none'
};

export var invisible: NestedCSSProperties = {
  visibility: 'hidden'
};

////////////////////
// Fixed position //
////////////////////

/**
 * You don't generally need to use this.
 * Instead use fixedBottom,fixedLeft,fixedRight,fixedTop
 */
export var fixed: NestedCSSProperties = {
  position: 'fixed'
};

export const fixedTop: NestedCSSProperties = extend(fixed, {
  top: 0,
  left: 0,
  right: 0,
});
export const fixedRight: NestedCSSProperties = extend(fixed, {
  top: 0,
  right: 0,
  bottom: 0,
});
export const fixedBottom: NestedCSSProperties = extend(fixed, {
  right: 0,
  bottom: 0,
  left: 0,
});
export const fixedLeft: NestedCSSProperties = extend(fixed, {
  top: 0,
  bottom: 0,
  left: 0,
});

//////////////////
// A new layer  //
//////////////////
/**
 * New Layer parent
 */
export var newLayerParent: NestedCSSProperties = {
  position: 'relative',
};

/**
 *  You can have this anywhere and its like you have opened a new body
 *  This new layer will attach itself to the nearest parent with `position:relative` or `position:absolute` (which is what a new layer is by itself)
 */
export var newLayer: NestedCSSProperties = {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
};

/**
 * Smooth scrolling
 */
export const scroll: NestedCSSProperties = {
  '-webkit-overflow-scrolling': 'touch',
  overflow: 'auto'
}

/**
 * Box helpers
 * Having top, left, bottom, right seperated makes it easier to override and maintain individual properties
 */
export namespace Box {
  /**
   * For `number` we assume pixels e.g. 5 => '5px'
   * For `string` *you* should provide the unit e.g. '5px'
   */
  export type BoxUnit = number | string;
  function boxUnitToString(value: BoxUnit): string {
    if (typeof value === 'number') {
      return value.toString() + 'px';
    }
    else {
      return value;
    }
  }

  /**
   * A box function is something that can take:
   * - all
   * - topAndBottom + leftRight
   * - top + right + bottom + left
   */
  export interface BoxFunction<T> {
    (all: BoxUnit): T;
    (topAndBottom: BoxUnit, leftAndRight: BoxUnit): T;
    (top: BoxUnit, right: BoxUnit, bottom: BoxUnit, left: BoxUnit): T;
  }

  /**
   * For use in simple functions
   */
  type Box = {
    top: string;
    right: string;
    bottom: string;
    left: string;
  }

  /**
   * Takes a function that expects Box to be passed into it
   * and creates a BoxFunction
   */
  function createBoxFunction<T>(mapFromBox: (box: Box) => T): BoxFunction<T> {
    const result: BoxFunction<T> = (a: BoxUnit, b?: BoxUnit, c?: BoxUnit, d?: BoxUnit) => {
      if (b === undefined && c === undefined && d === undefined) {
        b = c = d = a;
      }
      else if (c === undefined && d === undefined) {
        c = a;
        d = b;
      }

      let box = {
        top: boxUnitToString(a),
        right: boxUnitToString(b),
        bottom: boxUnitToString(c),
        left: boxUnitToString(d)
      };

      return mapFromBox(box);
    }
    return result;
  }

  export const padding = createBoxFunction((box) => {
    return {
      paddingTop: box.top,
      paddingRight: box.right,
      paddingBottom: box.bottom,
      paddingLeft: box.left
    };
  });

  export const margin = createBoxFunction((box) => {
    return {
      marginTop: box.top,
      marginRight: box.right,
      marginBottom: box.bottom,
      marginLeft: box.left
    };
  });

  export const border = createBoxFunction((box) => {
    return {
      borderTop: box.top,
      borderRight: box.right,
      borderBottom: box.bottom,
      borderLeft: box.left
    };
  });
}

