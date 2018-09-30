# NativeModels

[![npm pack age](https://nodei.co/npm/nativemodels.png?downloads=true&downloadRank=true&stars=true)](https://npmjs.org/package/nativemodels)

[![Version](https://badge.fury.io/js/nativemodels.svg)](https://npmjs.org/package/nativemodels) [![Build Status](https://travis-ci.org/Prefinem/nativemodels.svg)](https://travis-ci.org/Prefinem/nativemodels)

[![Maintainability](https://api.codeclimate.com/v1/badges/bde2cb4374583f7f2288/maintainability)](https://codeclimate.com/github/Prefinem/nativemodels/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/bde2cb4374583f7f2288/test_coverage)](https://codeclimate.com/github/Prefinem/nativemodels/test_coverage) [![Greenkeeper badge](https://badges.greenkeeper.io/Prefinem/nativemodels.svg)](https://greenkeeper.io/)

![Weekly Downloads](https://img.shields.io/npm/dw/nativemodels.svg) ![Monthly Downloads](https://img.shields.io/npm/dm/nativemodels.svg) ![Yearly Downloads](https://img.shields.io/npm/dy/nativemodels.svg)

![Issues](https://img.shields.io/github/issues/Prefinem/nativemodels.svg) ![Pull Requests](https://img.shields.io/github/issues-pr/Prefinem/nativemodels.svg)

![Dependencies](https://david-dm.org/Prefinem/nativemodels.svg) ![Dev Dependencies](https://david-dm.org/Prefinem/nativemodels/dev-status.svg)

Native Models provides a way to map objects in a clean and typed way. The main goal is to ensure runtime type checking and consistent models for APIs.

## Getting Started

```js
import { createModel } from 'nativemodels';
import { array, boolean, computed, date, int, object, string } from 'nativemodels/datatypes';

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

## Datatypes

-   array
-   boolean
-   computed
-   date
-   float
-   int
-   object
-   string

## Extending Datatypes

### datatypes.validate(value, name)

If value is valid, returns true, else throws error. Name is key on object;

### datatypes.parse(value)

Parses the value being set. Used to extend base datatype

## Customtypes

Custom types are types that are useful to have and common enough for use to include them in our library. They currently include

-   email
-   enumberable
-   guid
-   phone
-   url

### Examples

```js
const { email, enumberable, guid, phone, url } = require('nativemodels/customtypes');

const model = createModel({
	email: email(),
	enumberable: enumberable(['FOO', 'BAR']),
	guid: guid(),
	phone: phone(),
	url: url(),
});
```
