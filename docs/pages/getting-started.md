---
title: Getting Started
permalink: /getting-started/
---

# Getting Started

---

## Create your schema first

`schema/photo.js`

```js
const { string } = require('nativemodels/datatypes');

const photoSchema = {
  ext: string(),
  url: string().required(),
};

module.exports = photoSchema;
```

`schema/contact.js`

```js
const { email, phone, url } = require('nativemodels/customtypes');

const contactSchema = {
  email: email(),
  phone: phone(),
  url: url(),
};

module.exports = contactSchema;
```

`schema/user.js`

```js
const { array, boolean, computed, date, int, object, string } = require('nativemodels/datatypes');

const contactSchema = require('./contact');
const photoSchema = require('./photo');

const userSchema = {
  accountID: int().nullable(),
  contact: object(contactSchema),
  created: date(),
  firstName: string().required(),
  fullName: computed((record) => `${record.firstName} ${record.lastName}`),
  isAdmin: boolean().nullable(),
  lastName: string().required(),
  photos: array(object(photoSchema)),
  typeID: int().default(2),
};

module.exports = userSchema;
```

---

## Now create your model

`models/user.js`

```js
const { createModel } = require('nativemodels');
const userSchema = require('./../schema/user');

module.exports = createModel(userSchema);
```

---

## Now populate your model with data

`index.js`

```js
const userModel = require('./models/user');

const johnSmith = userModel({
  contact: {
    email: 'j.smith@example.com',
  },
  firstName: 'John',
  lastName: 'Smith',
  photos: [
    {
      ext: '.jpg',
      url: 'https://example.com/img.jpg',
    },
  ],
});

console.log(johnSmith);
// => { firstName: 'John', lastName: 'Smith', fullName: 'John Smith', ...}

const userRecords = [
  {
    firstName: 'John',
    lastName: 'Smith',
  },
  {
    firstName: 'Jane',
    lastName: 'Doe',
  },
];
const users = userRecords.map(userModel);

console.log(users);
// => [{ firstName: 'John', lastName: 'Smith', fullName: 'John Smith', ...}]

const janeDoe = userModel({
  ...johnSmith,
  firstName: 'Jane',
  lastName: 'Doe',
});

console.log(janeDoe);
// => { firstName: 'Jane', lastName: 'Doe', fullName: 'Jane Doe', ...}
```
