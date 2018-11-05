const {
	createModel,
	customtypes: { url },
} = require('./../source');

const validURLs = [
	'http://www.example.com',
	'http://example.com',
	'http://foo.example.com',
	'https://www.example.com',
	'https://www.example.com/foo',
	'https://www.example.com/foo?bar',
	'https://www.example.com/foo?bar=1',
	'http://foo.com/blah_blah',
	'http://foo.com/blah_blah/',
	'http://foo.com/blah_blah_(wikipedia)',
	'http://foo.com/blah_blah_(wikipedia)_(again)',
	'http://www.example.com/wpstyle/?p=364',
	'https://www.example.com/foo/?bar=baz&inga=42&quux',
	'http://✪df.ws/123',
	'http://userid:password@example.com:8080',
	'http://userid:password@example.com:8080/',
	'http://userid@example.com',
	'http://userid@example.com/',
	'http://userid@example.com:8080',
	'http://userid@example.com:8080/',
	'http://userid:password@example.com',
	'http://userid:password@example.com/',
	'http://142.42.1.1/',
	'http://142.42.1.1:8080/',
	'http://➡.ws/䨹',
	'http://⌘.ws',
	'http://⌘.ws/',
	'http://foo.com/blah_(wikipedia)#cite-1',
	'http://foo.com/blah_(wikipedia)_blah#cite-1',
	'http://foo.com/unicode_(✪)_in_parens',
	'http://foo.com/(something)?after=parens',
	'http://☺.damowmow.com/',
	'http://code.google.com/events/#&product=browser',
	'http://j.mp',
	'ftp://foo.bar/baz',
	'http://foo.bar/?q=Test%20URL-encoded%20stuff',
	'http://مثال.إختبار',
	'http://例子.测试',
	'http://उदाहरण.परीक्षा',
	'http://1337.net',
	'http://223.255.255.254',
	'https://foo_bar.example.com/',
];
const invalidURLs = [
	'',
	'http://www .example.com',
	'http://',
	'http://.',
	'http://..',
	'http://../',
	'http://?',
	'http://??',
	'http://??/',
	'http://#',
	'http://##',
	'http://##/',
	'//',
	'//a',
	'///a',
	'///',
	'http:///a',
	'foo.com',
	'rdar://1234',
	'h://test',
	'http:// shouldfail.com',
	':// should fail',
	'http://foo.bar/foo(bar)baz quux',
	'ftps://foo.bar/',
	'http://-error-.invalid/',
	'http://-a.b.co',
	'http://a.b-.co',
	'http://.www.foo.bar/',
	'http://.www.foo.bar./',
];

test('customtype | url - invalid', () => {
	const model = createModel({ url: url() });

	invalidURLs.forEach((string) => {
		expect(() => {
			model({ url: string });
		}).toThrow();
	});
});
test('customtype | url - valid', () => {
	const model = createModel({ url: url() });

	validURLs.forEach((string) => {
		expect(model({ url: string })).toEqual({ url: string });
	});
});
