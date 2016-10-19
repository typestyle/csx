"use strict";
var typestyle_1 = require("typestyle");
exports.flexRoot = {
    display: [
        '-webkit-flex',
        'flex'
    ]
};
exports.pass = {
    display: 'inherit',
    '-webkit-flex-direction': 'inherit',
    flexDirection: 'inherit',
    '-webkit-flex-grow': 1,
    flexGrow: 1,
};
exports.inlineRoot = {
    display: 'inline-flex'
};
exports.horizontal = typestyle_1.extend(exports.flexRoot, {
    '-webkit-flex-direction': 'row',
    flexDirection: 'row'
});
exports.vertical = typestyle_1.extend(exports.flexRoot, {
    '-webkit-flex-direction': 'column',
    flexDirection: 'column'
});
exports.wrap = {
    '-webkit-flex-wrap': 'wrap',
    flexWrap: 'wrap'
};
exports.flexNone = {
    flex: 'none'
};
exports.content = {
    '-webkit-flex-shrink': 0,
    flexShrink: 0
};
exports.flex = {
    '-webkit-flex': 1,
    flex: 1
};
exports.flex1 = exports.flex;
exports.flex2 = {
    '-webkit-flex': 2,
    flex: 2
};
exports.flex3 = {
    '-webkit-flex': 3,
    flex: 3
};
exports.flex4 = {
    '-webkit-flex': 4,
    flex: 4
};
exports.flex5 = {
    '-webkit-flex': 5,
    flex: 5
};
exports.flex6 = {
    '-webkit-flex': 6,
    flex: 6
};
exports.flex7 = {
    '-webkit-flex': 7,
    flex: 7
};
exports.flex8 = {
    '-webkit-flex': 8,
    flex: 8
};
exports.flex9 = {
    '-webkit-flex': 9,
    flex: 9
};
exports.flex10 = {
    '-webkit-flex': 10,
    flex: 10
};
exports.flex11 = {
    '-webkit-flex': 11,
    flex: 11
};
exports.flex12 = {
    '-webkit-flex': 12,
    flex: 12
};
exports.start = {
    '-webkit-align-items': 'flex-start',
    alignItems: 'flex-start'
};
exports.center = {
    '-webkit-align-items': 'center',
    alignItems: 'center'
};
exports.end = {
    '-webkit-align-items': 'flex-end',
    alignItems: 'flex-end'
};
exports.startJustified = {
    '-webkit-justify-content': 'flex-start',
    justifyContent: 'flex-start'
};
exports.centerJustified = {
    '-webkit-justify-content': 'center',
    justifyContent: 'center'
};
exports.endJustified = {
    '-webkit-justify-content': 'flex-end',
    justifyContent: 'flex-end'
};
exports.aroundJustified = {
    '-webkit-justify-content': 'space-around',
    justifyContent: 'space-around'
};
exports.betweenJustified = {
    '-webkit-justify-content': 'space-between',
    justifyContent: 'space-between'
};
exports.centerCenter = typestyle_1.extend(exports.flexRoot, exports.center, exports.centerJustified);
exports.selfStart = {
    '-webkit-align-self': 'flex-start',
    alignSelf: 'flex-start'
};
exports.selfCenter = {
    '-webkit-align-self': 'center',
    alignSelf: 'center'
};
exports.selfEnd = {
    '-webkit-align-self': 'flex-end',
    alignSelf: 'flex-end'
};
exports.selfStretch = {
    '-webkit-align-self': 'stretch',
    alignSelf: 'stretch'
};
exports.block = {
    display: 'block'
};
exports.none = {
    display: 'none'
};
exports.invisible = {
    visibility: 'hidden'
};
exports.scroll = {
    '-webkit-overflow-scrolling': 'touch',
    overflow: 'auto'
};
exports.fixed = {
    position: 'fixed'
};
exports.fixedTop = typestyle_1.extend(exports.fixed, {
    top: 0,
    left: 0,
    right: 0,
});
exports.fixedRight = typestyle_1.extend(exports.fixed, {
    top: 0,
    right: 0,
    bottom: 0,
});
exports.fixedBottom = typestyle_1.extend(exports.fixed, {
    right: 0,
    bottom: 0,
    left: 0,
});
exports.fixedLeft = typestyle_1.extend(exports.fixed, {
    top: 0,
    bottom: 0,
    left: 0,
});
exports.newLayerParent = {
    position: 'relative',
};
exports.attachToParentLayer = {
    position: 'absolute',
};
exports.newLayer = typestyle_1.extend(exports.attachToParentLayer, {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
});
var Box;
(function (Box) {
    function boxUnitToString(value) {
        if (typeof value === 'number') {
            return value.toString() + 'px';
        }
        else {
            return value;
        }
    }
    function createBoxFunction(mapFromBox) {
        var result = function (a, b, c, d) {
            if (b === undefined && c === undefined && d === undefined) {
                b = c = d = a;
            }
            else if (c === undefined && d === undefined) {
                c = a;
                d = b;
            }
            var box = {
                top: boxUnitToString(a),
                right: boxUnitToString(b),
                bottom: boxUnitToString(c),
                left: boxUnitToString(d)
            };
            return mapFromBox(box);
        };
        return result;
    }
    Box.padding = createBoxFunction(function (box) {
        return {
            paddingTop: box.top,
            paddingRight: box.right,
            paddingBottom: box.bottom,
            paddingLeft: box.left
        };
    });
    Box.margin = createBoxFunction(function (box) {
        return {
            marginTop: box.top,
            marginRight: box.right,
            marginBottom: box.bottom,
            marginLeft: box.left
        };
    });
    Box.border = createBoxFunction(function (box) {
        return {
            borderTop: box.top,
            borderRight: box.right,
            borderBottom: box.bottom,
            borderLeft: box.left
        };
    });
})(Box = exports.Box || (exports.Box = {}));
