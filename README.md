# NativeModels

Native Models provides a way to map objects and arrays of objects in a clean and typed way. The main goal is to ensure runtime type checking and consistent models for APIs.

## Getting Started

```
import {
	boolean,
	computed,
	date,
	guid,
	id,
	string,
} from './datatypes';
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
