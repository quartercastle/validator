# Pretty schema
There is already a lot of schema validation libraries for the JavaScript community,
but i have never really found one that i like. There is always to much boilerplate
involved with defining the schemas and it just makes a lot of noise in the codebase.
I want something intuitive, maintainable and extensible. Thats what i try to accomplish
with `pretty-schema/pure-schema`.


# The Schema
The definition of a schema in this package the key is the field to validate and the
value is the how the field should be validated.
```js
const schema = {
  field: function validatorFunction (value) {}
}
```

```js
const schema = {
  name: string({ required, max: 40 }),
  email: email({ required }),
  age: value => value === 23,
  skills: [{
    type: String,
    experience: number({ min: 0, max: 10 })
  }],
  createdAt: Date,
  updatedAt: Date
}
```

### Validator
Static functions
 - registerRule()
Events
 - On error

### Schema rules
Rules are basically just pure functions and is refered to as `validator functions`
in this project. A validator function takes a single argument which is the
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
which accepts some properties.
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
