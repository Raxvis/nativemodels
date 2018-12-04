## Boolean

Boolean coerces the value passed into to be a Boolean.

```js
const {
	createModel,
	datatypes: { boolean },
} = require('nativemodels');

const schema = {
	isAwesome: boolean(),
};

const model = createModel(schema);

const user = model({
	isAwesome: true, // 'true' or 1 would also return as true.  Same as 0, undefined or null would be false
});
```
