[![CircleCI](https://img.shields.io/circleci/build/github/a6b8/tapAuthRedeem/main)]()
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

# TapAuthRedeem
This class is a modified implementation of https://github.com/Trac-Systems/tap-protocol-token-auth-boilerplate. It helps to create `auth` and `redeem` structs.

## Features:
- Generates an `auth` struct
- Generates a `redeem` struct

## Quickstart
This example creates an `auth` structure.

### Code
```js
import { TapAuthRedeem } from "../src/TapAuthRedeem.mjs"
const tapAuth = new TapAuthRedeem()

console.log( '####### RANDOM PAIR ########' )
tapAuth.setPair( {} )
console.log( tapAuth.getPair() )

console.log( '####### AUTH RESULT ########' )
const authResult = await tapAuth.generate( {
    'messageKey': 'auth',
    'message': [ 'gib' ],
    'salt': Math.random()
} )
```

## Table of Contents
- [TapAuthRedeem](#tapauthredeem)
  - [Features:](#features)
  - [Quickstart](#quickstart)
    - [Code](#code)
  - [Table of Contents](#table-of-contents)
  - [Methods](#methods)
    - [constructor()](#constructor)
    - [setPair()](#setpair)
    - [getPair()](#getpair)
    - [generate()](#generate)
  - [License](#license)

## Methods

The following methods are available:

### constructor()

**Method**
```js
constructor( silent=false )
```

| Key          | Type     | Description                                      | Required |
|--------------|----------|--------------------------------------------------|----------|
| silent       | boolean  | This parameter allows suppressing terminal logs. | No       |


**Example**
```js
import { TapAuthRedeem } from "../src/TapAuthRedeem.mjs"
const tapAuth = new TapAuthRedeem( true )
```

**Returns**
```js
true
```

### setPair()

This method sets the public and private key. If an empty object `{}` is passed, an example pair is created, which can be retrieved using `.getPair()`.

**Method**
```js
.setPair( { publicKey, privateKey } )
```

| Key          | Type     | Description                                      | Required |
|--------------|----------|--------------------------------------------------|----------|
| publicKey    | string   | This string must be 66 characters long and start with `02`. | No       |
| privateKey   | string   | This string must be 64 characters long.           | No       |


**Example**

This example creates a public/private key pair.
```js
import { TapAuthRedeem } from "../src/TapAuthRedeem.mjs"
const tapAuth = new TapAuthRedeem()
tapAuth.setPair( {} )
```

**Returns**
```js
true
```


### getPair()

This method returns the current public/private key pair set by `.setPair()`.

**Method**
```js
.getPair()
```

**Example**
```js
import { TapAuthRedeem } from "../src/TapAuthRedeem.mjs"
const tapAuth = new TapAuthRedeem()
tapAuth.setPair( {} )
tapAut.getPair()
```

**Returns**
```js
true
```

### generate()

This method creates the actual struct. To perform this method, `.setPair()` must have been executed beforehand.

**Method**
```js
async generate( { messageKey, message, salt } )
```

| Key          | Type     | Description                                   | Required |
|--------------|----------|-----------------------------------------------|----------|
| messageKey   | string   | This string must be either `auth` or `reddem`.| Yes      |
| message      | object   | This is where the actual message is passed.  | Yes      |
| salt         | string   | This is where a salt can be passed.          | No       |

**Example**
```js
import { TapAuthRedeem } from "../src/TapAuthRedeem.mjs"
const tapAuth = new TapAuthRedeem()
tapAuth.setPair( {} )
const authResult = await tapAuth.generate( {
    'messageKey': 'auth',
    'message': [ 'gib' ],
    'salt': Math.random()
} )
```

**Returns**
```js
{ test, proto }
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

