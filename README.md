# NativeModels

[![npm pack age](https://nodei.co/npm/nativemodels.png?downloads=true&downloadRank=true&stars=true)](https://npmjs.org/package/nativemodels)

[![Version](https://badge.fury.io/js/nativemodels.svg)](https://npmjs.org/package/nativemodels) [![Build Status](https://travis-ci.org/Prefinem/nativemodels.svg)](https://travis-ci.org/Prefinem/nativemodels)

[![Maintainability](https://api.codeclimate.com/v1/badges/bde2cb4374583f7f2288/maintainability)](https://codeclimate.com/github/Prefinem/nativemodels/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/bde2cb4374583f7f2288/test_coverage)](https://codeclimate.com/github/Prefinem/nativemodels/test_coverage) [![Greenkeeper badge](https://badges.greenkeeper.io/Prefinem/nativemodels.svg)](https://greenkeeper.io/)

![Weekly Downloads](https://img.shields.io/npm/dw/nativemodels.svg) ![Monthly Downloads](https://img.shields.io/npm/dm/nativemodels.svg) ![Yearly Downloads](https://img.shields.io/npm/dy/nativemodels.svg)

![Issues](https://img.shields.io/github/issues/Prefinem/nativemodels.svg) ![Pull Requests](https://img.shields.io/github/issues-pr/Prefinem/nativemodels.svg)

![Dependencies](https://david-dm.org/Prefinem/nativemodels.svg) ![Dev Dependencies](https://david-dm.org/Prefinem/nativemodels/dev-status.svg)

Native Models provides a way to map objects and arrays of objects in a clean and typed way. The main goal is to ensure runtime type checking and consistent models for APIs.

## Getting Started

```js
import { arrayModel, objectModel } from 'nativemodels';
import { boolean, computed, date, int, string } from 'nativemodels/datatypes';

const schema = {
	firstName: string().required(),
	lastName: string().required(),
	fullName: computed((record) => `${record.firstName} ${record.lastName}`),
	typeID: int().default(2),
	isAdmin: boolean().default(false),
	accountID: int().nullable(),
	created: date().default(new Date()),
	updated: date().default(new Date()),
};

const userModel = objectModel(schema);

const johnSmith = userModel({
	firstName: 'John',
	lastName: 'Smith',
});
// => { firstName: 'John', lastName: 'Smith', fullName: 'John Smith', ...}

const usersModel = arrayModel(schema);

const users = usersModel([
	{
		firstName: 'John',
		lastName: 'Smith',
	},
	{
		firstName: 'Jane',
		lastName: 'Doe',
	},
]);

const janeDoe = userModel({
	...johnSmith,
	firstName: 'Jane',
	lastName: 'Doe',
});
// => { firstName: 'Jane', lastName: 'Doe', fullName: 'Jane Doe', ...}
```

## Datatype API

Datatype methods that can be called or extended.

### datatypes.default(defaultValue)

Sets a default value if no value is set

### datatypes.nullable()

Allows the value set to be null (useful for database models)

### datatypes.parse(value)

Parses the value being set. Used to extend base datatype

### datatypes.required()

Forces the value to be required. Is ignored if default value is set

## Datatypes

-   boolean
-   computed
-   date
-   float
-   int
-   string
