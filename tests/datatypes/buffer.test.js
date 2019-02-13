const {
	createModel,
	datatypes: { buffer },
} = require('./../../src');

test('buffer works', () => {
	const model = createModel({ buffer: buffer().required() });

	expect(model({ buffer: Buffer.from('test') }).buffer.toString()).toEqual('test');
});

test('buffer will convert if not a buffer', () => {
	const model = createModel({ buffer: buffer().required() });

	expect(model({ buffer: 'test' }).buffer.toString()).toEqual('test');
});

test('buffer will fail if strict', () => {
	const model = createModel({ buffer: buffer().strict() });

	expect(() => {
		model({ buffer: 'test' });
	}).toThrow('NativeModels - Property buffer is not a buffer');
});
