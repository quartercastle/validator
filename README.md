# Specla Validator

[![npm version](https://img.shields.io/npm/v/@specla/validator.svg)](https://www.npmjs.com/package/@specla/validator)
[![Build Status](https://travis-ci.org/specla/validator.svg?branch=master)](https://travis-ci.org/specla/validator)
[![Coverage Status](https://coveralls.io/repos/github/specla/validator/badge.svg?branch=master)](https://coveralls.io/github/specla/validator?branch=master)
[![Dependency Status](https://david-dm.org/specla/validator.svg)](https://david-dm.org/specla/validator)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![gzip size](http://img.badgesize.io/https://unpkg.com/@specla/validator/dist/validator.min.js?compression=gzip)](https://unpkg.com/@specla/validator/dist/validator.min.js)

A `4 kb` gzipped schema validator, built for developers, with extensibility and performance in mind.
It handles both synchronous and asynchronous validation and it is compatible
with Node.js and Browser environments out of the box.

```js
import Validator, { string, number } from '@specla/validator'

const schema = {
  name: String,
  email: async value => await isEmailUniqueInDB(value), // just an example
  age: value => value > 16,
  skills: [{
    type: string({ max: 255 }),
    experience: number({ min: 0, max: 10 })
  }],
  createdAt: Date
}

const data = {
  name: 'John Doe',
  email: 'test@example.com',
  age: 23,
  skills: [{
    type: 'Validation',
    experience: 10
  }],
  createdAt: new Date()
}

try {
  await new Validator(data, schema)
} catch (err) {
  console.log(err)
}
```
## Content
  - [Install](#install)
  - [Schema definition](#schema-definition)
  - [Types](#types)
    - [Array](#arrayproperties-object-schema-array)
    - [Boolean](#booleanproperties-object)
    - [Date](#dateproperties-object)
    - [Email](#emailproperties-object)
    - [Integer](#integerproperties-object)
    - [Mixed](#mixedproperties-object)
    - [Number](#numberproperties-object)
    - [Object](#objectproperties-object-schema-object)
    - [String](#stringproperties-object)
    - [Symbol](#symbolproperties-object)
    - [Url](#urlproperties-object)
  - [Custom types](#custom-types)
    - [Avanced types](#avanced-types)
    - [Mutate value from within type](#mutate-value-from-within-type)
    - [Asynchronous types](#asynchronous-types)
  - [Validator](#validator)


## Install
Download `@specla/validator` from npm and your are good to go!
```sh
npm install --save @specla/validator
```

## Schema definition
A schema is an array or object where the `key` has a corresponding validator
function. The validator function is invocated when you compare the schema against
your data. If you want to marke the value as invalid all you have to do is to
throw an error or return false within the validator function.
```js
// Object schema
const schema = {
  key: function validator (value) {
    // Validate the value to the key
  }
}

// Array schema
const arraySchema = [function validator (value) {}]
```
Specla Validator supports js standard types. This is possible because the Validator transforms
the schema into a transformed schema with validator functions for you at run time.
```js
// Defined schema with js types
const schema = {
  string: String,
}
// The above is transformed into the schema below at run time
const transformedSchema = {
  string: string()
}
```
The Validator ships with some types you can use to easier define
your schema and your constraints.
```js
// import types from @specla/validator
import { array, boolean, number, integer, object, string, symbol, mixed, date, email, url } from '@specla/validator'

const schema = {
  // validates a number from 0 - 100 with a precision of to decimals
  number: number({ min: 0, max: 100, precision: 2 })
}
```
All types shipped with this module requires a value by default. If you have a
target in the schema which should be optional, you just have to specify it like below.
```js
// will accept strings, null and undefined.
string({ optional: true })
```

## Types

#### array(`properties: Object`, `schema: Array`)
  - `properties`:
    - `defaultValue: Mixed`: if the value is null or undefined then set default value instead.
    - `optional: Boolean`: allows values to be null or undefined
    - `min: Number`: should be above the minimum length.
    - `max: Number`: should be below the maximum length.
  - `schema`: Schema to validate the arrays values against.

```js
const schema = {
  // this validates that the array has between 0 - 10 items which are strings.
  array: array({ min: 0, max: 10 }, [String])
}
```


#### boolean(`properties: Object`)
  - `properties`:
    - `defaultValue: Mixed`: if the value is null or undefined then set default value instead.
    - `optional: Boolean`: allows values to be null or undefined
    - `cast: Boolean`: if this is set to true the validator will try to cast all values to booleans

```js
const schema = {
  // this validates booleans and tries to cast a value to a boolean if its some other type.
  boolean: boolean({ cast: true })
}
```

#### date(`properties: Object`)
  - `properties`:
    - `defaultValue: Mixed`: if the value is null or undefined then set default value instead.
    - `optional: Boolean`: allows values to be null or undefined
    - `min: Number`: the give date should be above the minimum date.
    - `max: Number`: the give date should be below the maximum date.

```js
const schema = {
  // this validates a date between now to 2018
  date: date({ min: new Date(), max: new Date(2018) })
}
```

#### email(`properties: Object`)
  - `properties`:
    - `defaultValue: Mixed`: if the value is null or undefined then set default value instead.
    - `optional: Boolean`: allows values to be null or undefined

```js
const schema = {
  // this validates that a string is a valid email
  email: email()
}
```

#### integer(`properties: Object`)
  - `properties`:
    - `defaultValue: Mixed`: if the value is null or undefined then set default value instead.
    - `optional: Boolean`: allows values to be null or undefined
    - `cast: Boolean`: if this is set to true the validator will try to cast all values to integers
    - `min: Number`: should be above the minimum number.
    - `max: Number`: should be below the maximum number.

```js
const schema = {
  // this validates a number is an integer
  integer: integer()
}
```

#### mixed(`properties: Object`)
  - `properties`:
    - `defaultValue: Mixed`: if the value is null or undefined then set default value instead.
    - `optional: Boolean`: allows values to be null or undefined
    - `allows: Array`: specify which types it accepts, default is all types

```js
const schema = {
  // this validates that the targets value can be either a String or a Number
  mixed: mixed({ allows: [String, Number] })
}
```

#### number(`properties: Object`)
  - `properties`:
    - `defaultValue: Mixed`: if the value is null or undefined then set default value instead.
    - `optional: Boolean`: allows values to be null or undefined
    - `cast: Boolean`: if this is set to true the validator will try to cast all values to numbers
    - `min: Number`: should be above the minimum number.
    - `max: Number`: should be below the maximum number.
    - `precision: Number`: the number should have a precision of to decimals

```js
const schema = {
  // this validates a number with a decimal precision of 2, it will also try to
  // cast any value into a number
  number: number({ cast: true, precision: 2 })
}
```

#### object(`properties: Object`, `schema: Object`)
  - `properties`:
    - `defaultValue: Mixed`: if the value is null or undefined then set default value instead.
    - `optional: Boolean`: allows values to be null or undefined
  - `schema`: Schema to validate the object against.

```js
const schema = {
  // this validates an optional object with the schema { name: String }
  object: object({ optional: true }, {
    name: String
  })
}
```

#### string(`properties: Object`)
  - `properties`:
    - `defaultValue: Mixed`: if the value is null or undefined then set default value instead.
    - `optional: Boolean`: allows values to be null or undefined
    - `cast: Boolean`: if this is set to true the validator will try to cast all values into a string
    - `min: Number`: should be above the minimum length.
    - `max: Number`: should be below the maximum length.
    - `lowercase: Boolean`: the string should be lowercased
    - `uppercase: Boolean`: the string should be uppercased
    - `truncate: Boolean`: if the string is above the max value then truncate the string
    - `match: RegExp`: string should match the regex pattern

```js
const schema = {
  // this validates a string is below max length otherwise it will be truncated
  string: string({ max: 10, truncate: true })
}
```

#### symbol(`properties: Object`)
  - `properties`:
    - `defaultValue: Mixed`: if the value is null or undefined then set default value instead.
    - `optional: Boolean`: allows values to be null or undefined

```js
const schema = {
  // this validates a symbol
  symbol: symbol()
}
```

#### url(`properties: Object`)
  - `properties`:
    - `defaultValue: Mixed`: if the value is null or undefined then set default value instead.
    - `optional: Boolean`: allows values to be null or undefined
    - `protocol: Boolean`: protocol should be specified in the url
    - `secure: Boolean`: url should use https

```js
const schema = {
  // this validates a secure url, does only accept urls that uses https
  url: url({ secure: true })
}
```

## Custom types
Specla Validator is made to be flexible and extensible. All types are just
pure functions. Therefore its easy to create your own types or use other
libraries methods as validators.
If the validator should be notified about an error, the type should just
throw one, the validator will catch it.
```js
// A simple implementation of a string validator
const string = value => {
  if (typeof value !== 'string') {
    throw new Error('the given value was not a string')
  }

  return true
}

// the string validator function can be used in a schema like below
const schema = {
  target: string
}
```
### Avanced types
Often we want to set some other constraints as well, than just verifying its a string.
A great way to handle this is to wrap the validator into a higher order function,
which can be configured through an argument.
```js
// an implementation of a validator function which can be configured through properties
function string(properties = {}) {
  return value => {
    if (typeof value !== 'string') {
      throw new Error('the given value was not a string')
    }

    if (properties.min && properties.min > value.length) {
      throw new Error('the given string is below the min length')
    }

    if (properties.max && properties.max < value.length) {
      throw new Error('the given string is above the max length')
    }

    return true
  }
}

// the string validator can be used in the schema like below
const schema = {
  target: string({ min: 4, max: 255 })
}
```

### Mutate value from within type
Sometimes your types will have to mutate the given value. An example could be
that you want to be able to specify a default value which is set if the given
value are `undefined` or `null`. This can be done by throwing a special exception
shipped with this package, see example below.
```js
import Value from '@specla/validator/lib/exceptions/Value'

// simple implementation of a type which sets a default value if the given
// value are null or undefined
function string({ defaultValue }) {
  return value => {
    if (defaultValue && (value === undefined || value === null)) {
      throw new Value(defaultValue)
    }

    return true
  }
}
```

### Asynchronous types
Specla validator supports asynchronous validator functions like below.
This enables you to query a database for a validation result or maybe validate a
hash or something else that is running asynchronously.
```js
function uniqueEmail() {
  return async value => {
    if (await db.collection('users').count({ email: value })) {
      throw new Error('There is already a user registered with this email.')
    }

    return true
  }
}
```

## Validator
Compare the data against the schema by invokating the the validator with the data
as the first argument and the schema as the second.
```js
const validator = new Validator(data, schema)
```
The Validator constructor returns a Validator promise, which will collect all
errors encountered during the validation process. To verify the validation you
can simply use the `.then()` and `.catch()` methods from the promise object or
even better use  the new es6 `async/await` api.
```js
validator.then(value => { /* is run on success! */ })
validator.catch(errors => { /* is run if errors where encountered */ })

// es6 async/await
try {
  await new Validator(data, schema)
} catch (errors) {
  // do something with the ecountered errors
}
```
If you want to catch the error as they happens, you can stream errors by
configuring the Validator like below.
```js
new Validator(data, schema, {
  onError: error => {
    error.context // the place in the schema where the validation failed.
    error.message // what failed.
    error.value   // the value that caused the validator to fail.
  }
})
```
