---
layout: default
title: Home
nav_order: 1
---

<div align="center">
	<img src="https://raw.githubusercontent.com/Prefinem/nativemodels/master/docs/logo.png" alt="NativeModels" width="200">
<!--
https://prefinem.com/simple-icon-generator/#eyJiYWNrZ3JvdW5kQ29sb3IiOiJyZ2IoMjAzLCA1NiwgNTUpIiwiYm9yZGVyQ29sb3IiOiJ3aGl0ZSIsImJvcmRlcldpZHRoIjoiMCIsImV4cG9ydFNpemUiOjUxMiwiZXhwb3J0aW5nIjpmYWxzZSwiZm9udEZhbWlseSI6IkFndWFmaW5hIFNjcmlwdCIsImZvbnRQb3NpdGlvbiI6IjY1IiwiZm9udFNpemUiOiI0MiIsImZvbnRXZWlnaHQiOjYwMCwiaW1hZ2UiOiIiLCJpbWFnZU1hc2siOiIiLCJpbWFnZVNpemUiOjUwLCJzaGFwZSI6ImRpYW1vbmQiLCJ0ZXh0IjoiTi4gTS4ifQ
-->
</div>

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

### Quick Start

---

```js
const { createModel } = require('nativemodels');
const { computed, string } = require('nativemodels/datatypes');
const { email } = require('nativemodels/customtypes');

const data = {
	fistName: 'John',
	lastName: 'Smith',
	email: 'john.smith@example.com',
};

const schema = {
	fistName: string(),
	lastName: string(),
	fullName: computed((record) => {
		return firstName + ' ' + lastName;
	}),
	email: email(),
};

const user = createModel(schema)(data);
```
