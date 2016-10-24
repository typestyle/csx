# NOTE 
This project is now a part of [TypeStyle][typestyle]. 

**Install**
`npm install typestyle --save`

**Use** Just pass the objects exposed from `typestyle/csx` to `typestyle.style` to get a class name e.g.

```js
import * as csx from 'typestyle/csx';
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
import * as csx from 'typestyle/csx';
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

[typestyle]: https://github.com/typestyle/typestyle
[demo]: https://typestyle.github.io/csx/demo/