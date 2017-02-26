# Specla Validator

[![npm version](https://img.shields.io/npm/v/specla-validator.svg)](https://www.npmjs.com/package/specla-validator)
[![Build Status](https://travis-ci.org/Specla/Validator.svg?branch=master)](https://travis-ci.org/Specla/Validator)
[![Dependency Status](https://david-dm.org/specla/validator.svg)](https://david-dm.org/specla/validator)
[![devDependencies Status](https://david-dm.org/specla/validator/dev-status.svg)](https://david-dm.org/specla/validator?type=dev)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

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
