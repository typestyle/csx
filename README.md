[![npm version](https://badge.fury.io/js/csx.svg)](http://badge.fury.io/js/csx)

# CSX
An abstraction over CSS properties with semantic names for enhanced readability and maintainability. Designed to be used with [TypeStyle][typestyle].

## Usage

**Install** `npm install csx --save`

Just pass the objects exposed from `csx` to `typestyle.style` to get a class name e.g.

```js
import * as csx from 'csx';
import {style} from 'typestyle';

const horizontal = style(csx.horizontal);

/** Sample usage with React */
var Demo = () => 
  <div className={horizontal}>
    <div>One</div>
    <div>Two</div>
    <div>Three</div>
  </div>;
```

Ofcourse you can compose styles easily: 

```js
import * as csx from 'csx';
import {style} from 'typestyle';

const flexHorizontalGreen = style(
  csx.flex,
  csx.horizontal,
  { backgroundColor: 'green' }
);

/** Sample usage with React */
const Demo = () => 
  <div className={flexHorizontalGreen}>
    <div>One</div>
    <div>Two</div>
    <div>Three</div>
  </div>;
```

* Checkout the [complete demo](https://typestyle.github.io/csx/demo/).
* Also checkout [how to be effective with this layout system](https://github.com/basarat/csx/blob/gh-pages/docs/README.md)

[typestyle]: https://github.com/typestyle/typestyle
