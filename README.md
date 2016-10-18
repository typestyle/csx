[![npm version](https://badge.fury.io/js/csx.svg)](http://badge.fury.io/js/csx)

# CSX
An abstraction over CSS properties with semantic names for enhanced readability and maintainability. Designed to be used with TypeStyle

## Usage

```js
import * as csx from 'csx';
import {style} from 'typestyle';

var Demo = React.createClass({
    render: function() {
        return <div className={style(csx.horizontal)}>
                    <div>One</div>
                    <div>Two</div>
                    <div>Three</div>
               </div>;
}
```

* Checkout the [complete demo](https://typestyle.github.io/csx/demo/).
* Also checkout [how to be effective with this layout system](https://github.com/basarat/csx/blob/gh-pages/docs/README.md)
