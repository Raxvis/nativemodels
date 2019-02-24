<h1 align="center">
	<br>
	<a href="https://github.com/Prefinem/nativemodels"><img src="https://raw.githubusercontent.com/Prefinem/nativemodels/master/docs/logo.png" alt="NativeModels" width="200"></a>
	<br>
<!--
https://prefinem.com/simple-icon-generator/#eyJiYWNrZ3JvdW5kQ29sb3IiOiJyZ2IoMjAzLCA1NiwgNTUpIiwiYm9yZGVyQ29sb3IiOiJ3aGl0ZSIsImJvcmRlcldpZHRoIjoiMCIsImV4cG9ydFNpemUiOjUxMiwiZXhwb3J0aW5nIjpmYWxzZSwiZm9udEZhbWlseSI6IkFndWFmaW5hIFNjcmlwdCIsImZvbnRQb3NpdGlvbiI6IjY1IiwiZm9udFNpemUiOiI0MiIsImZvbnRXZWlnaHQiOjYwMCwiaW1hZ2UiOiIiLCJpbWFnZU1hc2siOiIiLCJpbWFnZVNpemUiOjUwLCJzaGFwZSI6ImRpYW1vbmQiLCJ0ZXh0IjoiTi4gTS4ifQ
-->
</h1>

<!-- NPM -->

[![Version](https://flat.badgen.net/npm/v/nativemodels)](https://npmjs.org/package/nativemodels)
[![Weekly Downloads](https://flat.badgen.net/npm/dw/nativemodels)](https://npmjs.org/package/nativemodels)
[![License](https://flat.badgen.net/npm/license/nativemodels)](https://npmjs.org/package/nativemodels)

<!-- GitHub -->

[![Open Issues](https://flat.badgen.net/github/open-issues/Prefinem/nativemodels)](https://github.com/Prefinem/nativemodels)
[![Stars](https://flat.badgen.net/github/stars/Prefinem/nativemodels)](https://github.com/Prefinem/nativemodels)
[![Open PRs](https://flat.badgen.net/github/open-prs/Prefinem/nativemodels)](https://github.com/Prefinem/nativemodels)

<!-- Dependencies -->

[![Dependencies](https://flat.badgen.net/david/dep/Prefinem/nativemodels)](https://david-dm.org/Prefinem/nativemodels)
[![DevDependencies](https://flat.badgen.net/david/dev/Prefinem/nativemodels)](https://david-dm.org/Prefinem/nativemodels?type=dev)
[![PeerDependencies](https://flat.badgen.net/david/peer/Prefinem/nativemodels)](https://david-dm.org/Prefinem/nativemodels?type=peer)

<!-- PackagePhobia -->

[![Install Size](https://flat.badgen.net/packagephobia/install/nativemodels)](https://packagephobia.now.sh/result?p=nativemodels)
[![Publish Size](https://flat.badgen.net/packagephobia/publish/nativemodels)](https://packagephobia.now.sh/result?p=nativemodels)

<!-- Travis -->

[![Build Status](https://flat.badgen.net/travis/Prefinem/nativemodels)](https://travis-ci.com/Prefinem/nativemodels)

<!-- CircleCI -->

[![Build Status](https://flat.badgen.net/circleci/github/Prefinem/nativemodels)](https://circleci.com/gh/Prefinem/nativemodels)

<!-- CodeCov -->

[![Code Coverage](https://flat.badgen.net/codecov/c/github/Prefinem/nativemodels)](https://codecov.io/gh/Prefinem/nativemodels)

<!-- CodeClimate -->

[![Technical Debt](https://flat.badgen.net/codeclimate/tech-debt/Prefinem/nativemodels)](https://codeclimate.com/github/Prefinem/nativemodels)
[![Maintainability](https://flat.badgen.net/codeclimate/maintainability/Prefinem/nativemodels)](https://codeclimate.com/github/Prefinem/nativemodels)
[![Coverage](https://flat.badgen.net/codeclimate/coverage/Prefinem/nativemodels)](https://codeclimate.com/github/Prefinem/nativemodels)
[![Lines of Code](https://flat.badgen.net/codeclimate/loc/Prefinem/nativemodels)](https://codeclimate.com/github/Prefinem/nativemodels)

Native Models provides a way to map objects in a clean and typed way. The main goal is to ensure runtime type checking and consistent models for APIs.

## Getting Started

```js
const { createModel } = require('nativemodels');
const { array, boolean, computed, date, int, object, string } = require('nativemodels/datatypes');

const photoSchema = {
	ext: string(),
	url: string().required(),
};

const contactSchema = {
	email: string(),
	phone: string(),
	url: string(),
};

const userSchema = {
	accountID: int().nullable(),
	contact: object(contactSchema),
	created: date(),
	firstName: string().required(),
	fullName: computed((record) => `${record.firstName} ${record.lastName}`),
	isAdmin: boolean().nullable(),
	lastName: string().required(),
	photos: array(object(photoSchema)),
	typeID: int().default(2),
};

const userModel = createModel(userSchema);

const johnSmith = userModel({
	contact: {
		email: 'j.smith@example.com',
	},
	firstName: 'John',
	lastName: 'Smith',
	photos: [
		{
			ext: '.jpg',
			url: 'https://example.com/img.jpg',
		},
	],
});
// => { firstName: 'John', lastName: 'Smith', fullName: 'John Smith', ...}

const userRecords = [
	{
		firstName: 'John',
		lastName: 'Smith',
	},
	{
		firstName: 'Jane',
		lastName: 'Doe',
	},
];
const users = userRecords.map(userModel);
// => [{ firstName: 'John', lastName: 'Smith', fullName: 'John Smith', ...}]

const janeDoe = userModel({
	...johnSmith,
	firstName: 'Jane',
	lastName: 'Doe',
});
// => { firstName: 'Jane', lastName: 'Doe', fullName: 'Jane Doe', ...}
```

## Datatype API

Datatype methods that can be chained when defining schema.

### datatypes.default(defaultValue)

Sets a default value if no value is set

### datatypes.nullable()

Allows the value set to be null (useful for database models)

### datatypes.required()

Forces the value to be required. Is ignored if default value is set

### datatypes.strict()

Requires the value that is passed in to be the correct datatype instead of coerced

### datatypes.transform(transformFunction, type = 'post')

Takes a validated value, and transforms it according to the transform function

#### Types

-   `post` - happens after validation
-   `pre` - happens before validation

```js
const { createModel } = require('nativemodels');
const { string } = require('nativiemodels/datatypes');

const schema = {
	name: string().transform((value) => value.toUpperCase()),
	id: int().transform((value) => parseInt(value), 'pre'),
};
const model = createModel(schema);
const user = model({ name: 'john', id: '1' });

// => { name: 'JOHN', id: 1 }
```

### datatypes.from(fromKeys, options)

When passing in an object that you would like a key renamed, you can set the correct name in the schema and set the from to key name on the original object. This is useful for renaming and recasing.

```js
const { createModel } = require('nativemodels');
const { string } = require('nativiemodels/datatypes');

const schema = {
	name: string().from('firstName'),
};
const model = createModel(schema);
const user = model({ firstName: 'john' });

console.log(user.name);
// => 'john'
```

## Datatypes

-   any
-   array
-   base
-   boolean
-   buffer
-   computed
-   date
-   float
-   int
-   object
-   string

### computed

The computed datatype accepts a function in with the current record of the object and key name is passed in and any context passed to createModel. The value is the result that is returned.

```js
const { createModel } = require('nativemodels');
const { computed, string } = require('nativiemodels/datatypes');

const schema = {
	hello: computed((record, key, context) => `${key} ${record.name} ${context.lastName}`),
	name: string(),
};
const model = createModel(schema, {}, { lastName: 'smith' });

const user = model({ name: 'john' });
const hello = user.hello;
// => 'hello john smith'
```

Values are generated on access of the key `const hello = user.hello;`

If you wish your result to type checked, you can pass in a second parameter of the type. The value will be evaluated on access.

```js
const { createModel } = require('nativemodels');
const { computed, int, string } = require('nativiemodels/datatypes');

const schema = {
	hello: computed((record, key) => `${key} ${record.name}`, int()),
	name: string(),
};
const model = createModel(schema);

const user = model({ name: 'john' });
cosnt hello = user.hello;
// => new Error('Property hello is not an int`)
```

If you wish to be able override the value, you can do so with a third paramater object

```js
const { createModel } = require('nativemodels');
const { computed, int, string } = require('nativiemodels/datatypes');

const schema = {
	hello: computed((record, key) => `${key} ${record.name}`, string().strict(), { allowOverride: true }),
	name: string(),
};
const model = createModel(schema);

const user = model({ name: 'john' });

user.hello = 'goodbye';

cosnt hello = user.hello;
// => 'goodbye'

user.hello = 1
// => new Error('Property hello is not a string')
```

### string(options)

```js
const user = createModel({ name: string({ length: 4 }) })({ name: 'William' });

console.log(user.name);
// => 'Will'
```

With Strict Mode

```js
const user = createModel({ name: string({ length: 4 }).strict() })({ name: 'William' });
// => new Error('Property name is longer than 4')
```

## Extending Datatypes

```js
const { createType } = require('nativemodels');

const myCustomDataType = () =>
	createType({
		parse: (key, value) => `${key}:${value}`,
		requiredCheck(key, value) {
			if (key && value) {
				return true;
			}

			throw new Error(`Property: '${key}' is required`);
		},
		strictCheck: (key, value) => {
			if (typeof value === 'string') {
				return true;
			}

			throw new Error(`Property ${key} is not a customDataType`);
		},
		validate: (key, value) => {
			if (`${key}:${value}` !== ':') {
				return true;
			}

			throw new Error(`Property ${key} is not a customDataType`);
		},
	});

module.exports = int;
```

### base.parse(key, value)

Parses the value being set

### base.validCheck(key, value)

Returns true if passes your valid check else should throw an erorr

### base.requiredCheck(key, value)

Returns true if passes your required check else should throw an error

### base.strictCheck(key, value)

Returns true is passes your strict check else should throw an error

## Customtypes

Custom types are types that are useful to have and common enough for use to include them in our library. They currently include

-   email
-   enumerable
-   guid
-   phone
-   regex
-   url

### Examples

```js
const { email, enumerable, guid, phone, regex, url } = require('nativemodels/customtypes');

const model = createModel({
	email: email(),
	enumerable: enumerable(['FOO', 'BAR']), // Array of values to be compared against
	guid: guid(),
	phone: phone(),
	regex: regex(/foo/iu, 'Foo'), // Regular Expression and Name of Type
	url: url(),
});
```

## Async / Promise Computed Functions

Sometimes computed values aren't syncronous. To help you deal with that, we have provided the resolve method which will allow you to resolve all computed functions that are promises or async functions.

**_NOTE: You must return an async function, Promise or syncronous result. Generators will not work with this_**

**_WARNING: This is an N+1 unoptimized resolve meaning that for each nested array / object will require an extra iteration._**

```js
const { createModel, resolve } = require('nativemodels');
const { boolean, computed } = require('nativemodels/datatypes');

const schema = {
	async: computed(
		(record) =>
			new Promise((succeed, reject) => (record.succeed ? succeed(1) : reject(new Error('Failed to resolve')))),
	),
	succeed: boolean().default(false),
};

const model = createModel(schema);
const data = model({ succeed: true });

const resolvedData = await resolve(data);
// => { async: 1, succeed: true }
```

### Schema Parsing of resolved data

You can provide a second option to `resolve()` that will allow you to receive back an object that has had the schema applied to it.

```js
const { createModel, resolve } = require('nativemodels');
const { boolean, computed, int } = require('nativemodels/datatypes');

const schema = {
	async: computed(
		(record) =>
			new Promise((succeed, reject) => (record.succeed ? succeed(1) : reject(new Error('Failed to resolve')))),
	),
	succeed: boolean().default(false),
};

const resolvedSchema = {
	async: int(),
	succeed: boolean(),
};

const model = createModel(schema);
const data = model({ succeed: true });

const resolvedData = await resolve(data, resolvedSchema);
// => { async: 1, succeed: true }
```

## Options for createModel

### defaultOptions

Options are merged with whatever object is passed in, so a blank object will keep the default options

```js
const defaultOptions = {
	allowNulls: false, // Allow nulls on all columns
	caseSensitive: true, // Ignores case when initializing object from model
	strict: false, // Throws an error if key is not in schema
	stripUndefined: true, // Strip undefined values passed in
};
```

### allowNulls

The allowNulls option `default: false` will allow you to accept null for any field in your schema document. Useful for importing data from database records

```js
const { createModel } = require('nativemodels');
const { string } = require('nativemodels/datatypes');

const options = {
	allowNulls: true,
};

const schema = {
	foo: string(),
};

const model = createModel(schema, options);
const data = model({ foo: null });
// => { foo: null }
```

### caseSensitive

The caseSensitive option `default(true)` allows you to turn off caseSensitive matching. This is useful for ignoring and parsing user submitted data into a nice clean format while still maintaining model integrity

```js
const { createModel } = require('nativemodels');
const { string } = require('nativemodels/datatypes');

const options = {
	caseSensitive: false,
};

const schema = {
	foo: string(),
};

const model = createModel(schema, options);
const data = model({ FOO: 'bar' });
// => { foo: 'bar' }
```

Options are shallow by default, so if you have a deeply nested object, you will need to pass down options by hand.

```js
const { createModel } = require('nativemodels');
const { object, string } = require('nativemodels/datatypes');

const options = {
	caseSensitive: false,
};

const schema = {
	foo: string(),
};

const deepSchema = {
	nested: object(schema, options),
};

const model = createModel(deepSchema, options);
const data = model({ Nested: { FOO: 'bar' } });
// => { nested: { foo: 'bar' } }
```

### strict

The strict option `default: false` allows you to throw an error if the inital object you are assigning has extra keys. This is useful for validating data structure when coming from an unknown source

```js
const { createModel } = require('nativemodels');
const { string } = require('nativemodels/datatypes');

const options = {
	strict: true,
};

const schema = {
	foo: string(),
};

const model = createModel(schema, options);
const data = model({ faa: 'bar' });
// => throw new Error(`Property: 'faa' is not defined in the schema`);
```

Options are shallow by default, so if you have a deeply nested object, you will need to pass down options by hand.

```js
const { createModel } = require('nativemodels');
const { object, string } = require('nativemodels/datatypes');

const options = {
	strict: true,
};

const schema = {
	foo: string(),
};

const deepSchema = {
	nested: object(schema, options),
};

const model = createModel(deepSchema, options);
const data = model({ nested: { faa: 'bar' } });
// => throw new Error(`Property: 'faa' is not defined in the schema`);
```

## stripUndefined

This will remove any undefined keys from the initial object passed in.

```js
const { createModel } = require('nativemodels');
const { string } = require('nativemodels/datatypes');

const options = {
	stripUndefined: true,
};

const schema = {
	foo: string(),
};

const model = createModel(schema);
const data = model({ foo: undefined });
// => {}
```

Versus

```js
const { createModel } = require('nativemodels');
const { string } = require('nativemodels/datatypes');

const options = {
	stripUndefined: false,
};

const schema = {
	foo: string(),
};

const model = createModel(schema);
const data = model({ foo: undefined });
// => { foo: undefined }
```

## createModel context

A third parameter can be passed in to createModel. This is called context and should not be used unless absolutely required. If a schema relies on it, you will have the potential to throw errors inside your computed functions which will make debugging difficult.

**WARNING: Use context at your own risk**

The use case for context is if you want to pass items to a computed field that normally wouldn't be accessible to the schema. Things such as a database connector, or variables unrelated to the model. This allows you to keep from litering the global space with variables that you might use in computed functions.

# generateSchema

If you ever need to generate a schema dynamically, we have provided a generateSchema function which will allow you to easily convert a simple object / json into a schema object. It supports custom types and functions for transform or compute.

```js
const {createType, generateSchema} = require('nativemodels');

const simpleSchema = {
	firstName: {
		type: 'string',
		default: 'John',
		required: true,
		nullable: true,
		strict: true,
	},
	/* or short circuit with just the type name */
	lastName: 'string',
	fullName: {
		type: 'computed',
		fn: 'firstAndLast',
	},
	email: {
		type: 'string',
		transform: 'tolowercase',
	},
	foo: {
		type: 'foo'
	},
};

const schemaFunctions = {
	firstAndLast = (record) => `${record.firstName} ${record.lastName}`,
	lowercase = (value) => value.toLowerCase(),
};

const customTypes = {
	foo: createType({ parse: () => 'bar' });
};

const schema = generateSchema(simpleSchema, customTypes, schemaFunctions);
const userData = {
	lastName: 'Smith',
	email: 'J.Smith@example.com',
	foo: true
};

const user = createModel(schema)(userData);
/*
{
	firstName: 'John',
	lastName: 'Smith',
	fullName: 'John Smith',
	email: 'j.smith@example.com',
	foo: 'bar',
}
*/
```
