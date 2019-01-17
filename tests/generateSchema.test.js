const { createModel, createType, generateSchema } = require('./../src');

const fs = require('fs');
const path = require('path');

const userJsonSchema = require('./setup/schemas/user.json');
const userSchema = require('./setup/schemas/user.js');
const userData = require('./setup/data/user.js');
const userResult = require('./setup/results/user.js');

const fns = {
	firstAndLast: (record) => `${record.firstName} ${record.lastName}`,
	lowercase: (value) => value.toLowerCase(),
};

test(`initial generateSchema test`, () => {
	const generatedSchema = generateSchema(userJsonSchema, {}, fns);

	const jsonModel = createModel(generatedSchema);
	const model = createModel(userSchema);

	const jsonData = jsonModel(userData);
	const data = model(userData);

	expect(jsonData).toEqual(data);
	expect(jsonData).toEqual(userResult);
});

test(`initial generateSchema test`, () => {
	const json = fs.readFileSync(path.join(__dirname, 'setup', 'schemas', 'user.json')).toString();
	const generatedSchema = generateSchema(json, {}, fns);

	const jsonModel = createModel(generatedSchema);
	const model = createModel(userSchema);

	const jsonData = jsonModel(userData);
	const data = model(userData);

	expect(jsonData).toEqual(data);
	expect(jsonData).toEqual(userResult);
});

test(`custom type with no types of fns`, () => {
	const schema = { foo: 'string' };
	const generatedSchema = generateSchema(schema);

	const model = createModel(generatedSchema);
	const data = model({ foo: 'bar' });

	expect(data).toEqual({ foo: 'bar' });
});

test(`custom type with generateSchema`, () => {
	const custom = () => createType({ parse: () => 'foobar' });
	const schema = { custom: 'custom' };
	const types = { custom };
	const generatedSchema = generateSchema(schema, types);

	const model = createModel(generatedSchema);
	const data = model({ custom: true });

	expect(data).toEqual({ custom: 'foobar' });
});

test(`fail if no type doesn't exsist`, () => {
	userJsonSchema.foo = 'bar';

	expect(() => {
		generateSchema(userJsonSchema, {}, fns);
	}).toThrow();
});

test(`fail if no type defined`, () => {
	userJsonSchema.foo = {
		default: 'bar',
	};

	expect(() => {
		generateSchema(userJsonSchema, {}, fns);
	}).toThrow();
});

test(`test yaml to json`, () => {
	const yaml = require('js-yaml');
	const yamlSchema = fs.readFileSync(path.join(__dirname, 'setup', 'schemas', 'user.yaml')).toString();
	const generatedSchema = generateSchema(yaml.safeLoad(yamlSchema), {}, fns);

	const yamlModel = createModel(generatedSchema);
	const model = createModel(userSchema);

	const yamlData = yamlModel(userData);
	const data = model(userData);

	expect(yamlData).toEqual(data);
	expect(yamlData).toEqual(userResult);
});
