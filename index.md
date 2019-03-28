---
layout: default
title: Home
nav_order: 1
---

<!-- prettier-ignore-start -->
# Native runtime type checking
{: .fs-9 }
<!-- prettier-ignore-end -->

Native Models provides a way to map objects in a clean and typed way. The main goal is to ensure runtime type checking and consistent models for APIs.
{: .fs-6 .fw-300 }

[Get started now](/getting-started){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 } [View it on GitHub](https://github.com/Prefinem/nativemodels){: .btn .fs-5 .mb-4 .mb-md-0 }

---

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

<!-- CircleCI -->

[![Build Status](https://flat.badgen.net/circleci/github/Prefinem/nativemodels)](https://circleci.com/gh/Prefinem/nativemodels)

<!-- CodeCov -->

[![Code Coverage](https://flat.badgen.net/codecov/c/github/Prefinem/nativemodels)](https://codecov.io/gh/Prefinem/nativemodels)

<!-- CodeClimate -->

[![Technical Debt](https://flat.badgen.net/codeclimate/tech-debt/Prefinem/nativemodels)](https://codeclimate.com/github/Prefinem/nativemodels)
[![Maintainability](https://flat.badgen.net/codeclimate/maintainability/Prefinem/nativemodels)](https://codeclimate.com/github/Prefinem/nativemodels)
[![Coverage](https://flat.badgen.net/codeclimate/coverage/Prefinem/nativemodels)](https://codeclimate.com/github/Prefinem/nativemodels)
[![Lines of Code](https://flat.badgen.net/codeclimate/loc/Prefinem/nativemodels)](https://codeclimate.com/github/Prefinem/nativemodels)

---

## Quick Start

### 1. Install

```
yarn install nativemodels
```

### 2. Define your model schema

```js
const { computed, string } = require('nativemodels/datatypes');
const { email } = require('nativemodels/customtypes');

const schema = {
	firstName: string(),
	lastName: string(),
	fullName: computed((record) => `${record.firstName} ${record.lastName}`),
	email: email(),
};

module.exports = schema;
```

### 3. Create and consume your model

```js
const { createModel } = require('nativemodels');
const schema = require('./schema');

const userModel = createModel(schema);
const userData = {
	firstName: 'John',
	lastName: 'Smith',
	email: 'john.smith@example.com',
};

const user = userModel(userData);
/*
 * {
 *     firstName: 'John',
 *     lastName: 'Smith',
 *     fullName: 'John Smith',
 *     email: 'john.smith@example.com',
 * }
 */
```
