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
import { boolean, computed, date, guid, id, string } from './datatypes';
import arrayModel from './arrayModel';
import objectModel from './objectModel';

const schema = {
	firstName: string().required(),
	lastName: string().required(),
	fullName: computed((record) => `${record.firstName} ${record.lastName}`),
	typeID: number().default(2),
	isAdmin: boolean().default(faulse),
	created: date().default(new Date()),
	updated: date().default(new Date()),
};

const userModel = objectModel(schema);

const johnSmith = userModel({
	firstName: 'John',
	lastName: 'Smith',
});
// => { firstName: 'John', lastName: 'Smith', fullName: 'John Smith', ...}

const usersModel = arrayObject(schema);

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
```
