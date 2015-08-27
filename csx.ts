// Other vendor prefix support can be provided by external projects like : autoprefixer embedded into "radium"
// https://github.com/Polymer/layout/blob/master/layout.html

export function extend(...args: any[]) {
    var newObj = {};
    for (let obj of args) {
        for (let key in obj) {
            //copy all the fields
            newObj[key] = obj[key];
        }
    }
    return newObj;
};

/** You don't need to use this generally. Prefer horizontal,vertical,horizontalReverse,verticalReverse */
export var flexRoot = {
    display: 'flex'
};

var inline = {
    display: 'inline-flex'
};

export var horizontal, vertical, horizontalReverse, verticalReverse;
horizontal = extend(flexRoot, {
    flexDirection: 'row'
});
horizontalReverse = extend(flexRoot, {
    flexDirection: 'row-reverse'
});
vertical = extend(flexRoot, {
    flexDirection: 'column',
    /**
     * if we don't specify a max height 
     * then the scroll bar will go on the parent and not some child of this flex container
     */ 
    maxHeight:'100%'
});
verticalReverse = extend(flexRoot, {
    flexDirection: 'column-reverse'
});

export var wrap = {
    flexWrap: 'wrap'
};
export var wrapReverse = {
    flexWrap: 'wrap-reverse'
};

export var flexAuto = {
    flex: '1 1 auto'
};

export var flexNone = {
    flex: 'none'
};

export var flex = {
    flex: 1
};

export var flex1 = flex;
export var flex2 = {
    flex: 2
};
export var flex3 = {
    flex: 3
};
export var flex4 = {
    flex: 4
};
export var flex5 = {
    flex: 5
};
export var flex6 = {
    flex: 6
};
export var flex7 = {
    flex: 7
};
export var flex8 = {
    flex: 8
};
export var flex9 = {
    flex: 9
};
export var flex10 = {
    flex: 10
};
export var flex11 = {
    flex: 11
};
export var flex12 = {
    flex: 12
};

/////////////////////////////
// Alignment in cross axis //
/////////////////////////////

export var start = {
    alignItems: 'flex-start'
};
export var center = {
    alignItems: 'center'
};
export var end = {
    alignItems: 'flex-end'
};

////////////////////////////
// Alignment in main axis //
////////////////////////////

export var startJustified = {
    justifyContent: 'flex-start'
};
export var centerJustified = {
    justifyContent: 'center'
};
export var endJustified = {
    justifyContent: 'flex-end'
};
export var aroundJustified = {
    justifyContent: 'space-around'
};
export var betweenJustified = {
    justifyContent: 'space-between'
};

////////////////////////////
// Alignment in both axes //
////////////////////////////

export var centerCenter = extend(flexRoot, center, centerJustified);

////////////////////
// Self alignment //
////////////////////

export var selfStart = {
    alignSelf: 'flex-start'
};
export var selfCenter = {
    alignSelf: 'center'
};
export var selfEnd = {
    alignSelf: 'flex-end'
};
export var selfStretch = {
    alignSelf: 'stretch'
};

//////////////////
// Other layout //
//////////////////

export var block = {
    display: 'block'
};

export var hidden = {
    display: 'none'
};

export var invisible = {
    visibility: 'hidden'
};

export var relative = {
    position: 'relative'
};

export var fit = {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
};

export var fullBleedBody = {
    margin: 0,
    height: '100vh'
};

export var scroll = {
    'webkitOverflowScrolling': 'touch',
    overflow: 'auto'
};

////////////////////
// Fixed position //
////////////////////

/** 
 * You don't generally need to use this. 
 * Instead use fixedBottom,fixedLeft,fixedRight,fixedTop
 */
export var fixed = {
    position: 'fixed'
};

export var fixedBottom, fixedLeft, fixedRight, fixedTop;
fixedTop = extend(fixed, {
    top: 0,
    left: 0,
    right: 0,
});
fixedRight = extend(fixed, {
    top: 0,
    right: 0,
    bottom: 0,
});
fixedBottom = extend(fixed, {
    right: 0,
    bottom: 0,
    left: 0,
});
fixedLeft = extend(fixed, {
    top: 0,
    bottom: 0,
    left: 0,
});