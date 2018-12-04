## Array

Array provides an array of types. These can be any other data type or custom type.

```js
const {
	createModel,
	datatypes: { array, string },
} = require('nativemodels');

const schema = {
	images: array(string()),
};

const model = createModel(schema);

const user = model({
	images: [
		'http://www.example.com/user/image/1.png',
		'http://www.example.com/user/image/2.png',
		'http://www.example.com/user/image/3.png',
	],
});
```
