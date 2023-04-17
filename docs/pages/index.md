---
title: About
---

# Native runtime type checking

Native Models provides a way to map objects in a clean and typed way. The main goal is to ensure runtime type checking and consistent models for APIs.

[Get started now](/getting-started) | [View it on GitHub](https://github.com/Prefinem/nativemodels)

---

<!-- [![Version](https://flat.badgen.net/npm/v/nativemodels)](https://npmjs.org/package/nativemodels) -->

- [![Version](https://img.shields.io/npm/v/nativemodels?style=for-the-badge)](https://npmjs.org/package/nativemodels)
- [![Build Status](https://img.shields.io/github/actions/workflow/status/Prefinem/nativemodels/.github/workflows/ci.yml?branch=master&style=for-the-badge)](https://github.com/Prefinem/nativemodels/actions)
- [![Maintainability](https://img.shields.io/codeclimate/coverage-letter/Prefinem/nativemodels?style=for-the-badge)](https://codeclimate.com/github/Prefinem/nativemodels/maintainability)
- [![Test Coverage](https://img.shields.io/codecov/c/github/Prefinem/nativemodels?style=for-the-badge)](https://codecov.io/gh/Prefinem/nativemodels)
- ![Monthly Downloads](https://img.shields.io/npm/dm/nativemodels?style=for-the-badge)
- ![Issues](https://img.shields.io/github/issues/Prefinem/nativemodels?style=for-the-badge)
- ![Pull Requests](https://img.shields.io/github/issues-pr/Prefinem/nativemodels?style=for-the-badge)

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
  email: email(),
  firstName: string(),
  fullName: computed((record) => `${record.firstName} ${record.lastName}`),
  lastName: string(),
};

module.exports = schema;
```

### 3. Create and consume your model

```js
const { createModel } = require('nativemodels');
const schema = require('./schema');

const userModel = createModel(schema);
const userData = {
  email: 'john.smith@example.com',
  firstName: 'John',
  lastName: 'Smith',
};

const user = userModel(userData);
/*
 * {
 *     email: 'john.smith@example.com',
 *     firstName: 'John',
 *     fullName: 'John Smith',
 *     lastName: 'Smith',
 * }
 */
```
