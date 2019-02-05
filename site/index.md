---
layout: default
title: Home
nav_order: 1
---

<!-- prettier-ignore-start -->
# Focus on writing good documentation
{: .fs-9 }
<!-- prettier-ignore-end -->

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
