# Specla Validator

Validate an object against a schema.

### Install
```sh
npm install --save specla-validator
```

### Usage
```js
const Validator = require('specla-validator')

const data = {
  name: 'Frederik',
  age: 23,
  skills: ['js'],
}

const schema = {
  name: String,
  age: Number,
  skills: Array
}

const validator = new Validator(data, schema)

// check for errors
console.log(validator.errors)
```
