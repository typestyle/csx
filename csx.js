function extend() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    var newObj = {};
    for (var _a = 0; _a < args.length; _a++) {
        var obj = args[_a];
        for (var key in obj) {
            newObj[key] = obj[key];
        }
    }
    return newObj;
}
exports.extend = extend;
;
exports.flexRoot = {
    display: 'flex'
};
var inline = {
    display: 'inline-flex'
};
exports.horizontal = extend(exports.flexRoot, {
    flexDirection: 'row'
});
exports.horizontalReverse = extend(exports.flexRoot, {
    flexDirection: 'row-reverse'
});
exports.vertical = extend(exports.flexRoot, {
    flexDirection: 'column',
    maxHeight: '100%'
});
exports.verticalReverse = extend(exports.flexRoot, {
    flexDirection: 'column-reverse'
});
exports.wrap = {
    flexWrap: 'wrap'
};
exports.wrapReverse = {
    flexWrap: 'wrap-reverse'
};
exports.flexAuto = {
    flex: '1 1 auto'
};
exports.flexNone = {
    flex: 'none'
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
