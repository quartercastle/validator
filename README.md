# Specla Validator

[![npm version](https://img.shields.io/npm/v/specla-validator.svg)](https://www.npmjs.com/package/specla-validator)
[![Build Status](https://travis-ci.org/Specla/Validator.svg?branch=master)](https://travis-ci.org/Specla/Validator)
[![Dependency Status](https://david-dm.org/specla/validator.svg)](https://david-dm.org/specla/validator)
[![devDependencies Status](https://david-dm.org/specla/validator/dev-status.svg)](https://david-dm.org/specla/validator?type=dev)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

## install
```sh
npm install --save @specla/validator
```

## Usage
```js
const schema = {
  name: String,
  createdAt: Date
}

const data = {
  name: 'John Doe',
  createdAt: new Date()
}

const validator = new Validator(data, schema)

if (validator.fails()) {
  console.log(validator.errors)
} else {
  console.log('Looks good!')
}
```

# The Schema
```js
const schema = {
  field: function validatorFunction (value) {}
}
```

```js
const schema = {
  name: string({ required: true, max: 40 }),
  email: email({ required: true }),
  age: value => value === 23,
  skills: [{
    type: String,
    experience: number({ min: 0, max: 10 })
  }],
  createdAt: Date,
  updatedAt: Date
}
```
### Schema types
Types are basically just pure functions and is refered to as `validator functions`.
They are often composed together of different rules.
A validator function takes a single argument which is the
value of the assigned key in the schema definition which it should validate.
Below is an example of a simple validation rule of a string.

```js
const string = value => {
  if (typeof value !== 'string') {
    throw new Error(`The given value wasn't a type of string`)
  }

  return true
}

// The rule can now be used in the schema like below
const schema = {
  name: string
}
```

### Advanced Rules
In many cases it would be nice if we could give our rule some dynamic properties,
a property could be if the value is required or a min/max length of the value.
A greate way to solve this problem is to wrap the rule definition into a function
which accepts some properties. We can then return our configured validator function.
```js

function string ({ required, min, max }) {
  return value => {
    if (typeof value !== 'string') {
      throw new Error(`The given value wasn't a type of string`)
    }

    if (required && value === '') {
      throw new Error(`The value is required`)
    }

    if (min && value.length < min) {
      throw new Error(`The value is under the min length`)
    }

    if (max && value.length > max) {
      throw new Error(`The value is over the max length`)
    }

    return true
  }
}

// The rule can now be used in the schema like below
const schema = {
  name: string({ required: true, min: 3, max: 10 })
}
```
