## Computed

The Computed allows you to pass a function which is executed when you access the key on the object. This function is passed the record upon key access.

```js
const {
	createModel,
	datatypes: { computed, string },
} = require('nativemodels');

const schema = {
	firstName: string().required(),
	fullName: computed((record) => `${record.firstName} ${record.lastName}`),
	lastName: string().required(),
};

const model = createModel(schema);

const user = model({
	firstName: 'John',
	lastName: 'Smith',
});
// => { firstName: 'John', fullName: 'John Smith', lastName: 'Smith'}

user.firstName = 'Jane';
// => { firstName: 'Jane', fullName: 'Jane Smith', lastName: 'Smith'}
```
