"use strict";
function extend() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
        var obj = args_1[_a];
        if (obj instanceof Array) {
            throw new Error("User error: use extend(a,b) instead of extend([a,b]). Object: " + obj);
        }
    }
    var newObj = {};
    for (var _b = 0, args_2 = args; _b < args_2.length; _b++) {
        var obj = args_2[_b];
        for (var key in obj) {
            newObj[key] = obj[key];
        }
    }
    return newObj;
}
exports.extend = extend;
;
exports.flexRoot = {
    display: 'flex',
};
exports.pass = {
    display: 'inherit',
    flexDirection: 'inherit',
    flexGrow: 1,
};
exports.inlineRoot = {
    display: 'inline-flex'
};
exports.horizontal = extend(exports.flexRoot, {
    flexDirection: 'row'
});
exports.vertical = extend(exports.flexRoot, {
    flexDirection: 'column'
});
exports.wrap = {
    flexWrap: 'wrap'
};
exports.flexNone = {
    flex: 'none'
};
exports.content = {
    flexShrink: 0
};
exports.flex = {
    flex: 1
};
exports.flex1 = exports.flex;
exports.flex2 = {
    flex: 2
};
exports.flex3 = {
    flex: 3
};
exports.flex4 = {
    flex: 4
};
exports.flex5 = {
    flex: 5
};
exports.flex6 = {
    flex: 6
};
exports.flex7 = {
    flex: 7
};
exports.flex8 = {
    flex: 8
};
exports.flex9 = {
    flex: 9
};
exports.flex10 = {
    flex: 10
};
exports.flex11 = {
    flex: 11
};
exports.flex12 = {
    flex: 12
};
exports.start = {
    alignItems: 'flex-start'
};
exports.center = {
    alignItems: 'center'
};
exports.end = {
    alignItems: 'flex-end'
};
exports.startJustified = {
    justifyContent: 'flex-start'
};
exports.centerJustified = {
    justifyContent: 'center'
};
exports.endJustified = {
    justifyContent: 'flex-end'
};
exports.aroundJustified = {
    justifyContent: 'space-around'
};
exports.betweenJustified = {
    justifyContent: 'space-between'
};
exports.centerCenter = extend(exports.flexRoot, exports.center, exports.centerJustified);
exports.selfStart = {
    alignSelf: 'flex-start'
};
exports.selfCenter = {
    alignSelf: 'center'
};
exports.selfEnd = {
    alignSelf: 'flex-end'
};
exports.selfStretch = {
    alignSelf: 'stretch'
};
exports.block = {
    display: 'block'
};
exports.hidden = {
    display: 'none'
};
exports.invisible = {
    visibility: 'hidden'
};
exports.relative = {
    position: 'relative'
};
exports.fit = {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
};
exports.fullBleedBody = {
    margin: 0,
    height: '100vh'
};
exports.scroll = {
    overflow: 'auto'
};
exports.fixed = {
    position: 'fixed'
};
exports.fixedTop = extend(exports.fixed, {
    top: 0,
    left: 0,
    right: 0,
});
exports.fixedRight = extend(exports.fixed, {
    top: 0,
    right: 0,
    bottom: 0,
});
exports.fixedBottom = extend(exports.fixed, {
    right: 0,
    bottom: 0,
    left: 0,
});
exports.fixedLeft = extend(exports.fixed, {
    top: 0,
    bottom: 0,
    left: 0,
});
exports.newLayerParent = {
    position: 'relative',
};
exports.newLayer = {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
};
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
