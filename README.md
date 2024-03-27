[![CircleCI](https://img.shields.io/circleci/build/github/a6b8/tapAuthRedeem/main)]() ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

# TapAuthRedeem
Diese Class ist eine abgewandelte Implemeniteurng von https://github.com/Trac-Systems/tap-protocol-token-auth-boilerplate. Und hilft um `auth` und `redeem` structs zu erstellen.  

## Features:
- Generiert ein `auth` struct
- Generiert ein `redeem` struct


## Quickstart
Dieses Beispiel erstellt einen `auth` structure.


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

Folgende Methoden sind verfügbar:

### constructor()

**Method**
```js
constructor( silent=false )
```

| Key                | Type     | Description                                       | Required |
|--------------------|----------|---------------------------------------------------|----------|
| silent        | boolean    | Mit diesem Parameter können terminal logs unterdrückt werden. | No      |


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

Diese Methode setzt den Public und Private Key. Falls ein leerres Object `{}` übermittelt wird, ein Example Pair erstellt. Dieses ist über `.getPair()` abfragbar.

**Method**
```js
.setPair( { publicKey, privateKey } )
```

| Key                | Type     | Description                                       | Required |
|--------------------|----------|---------------------------------------------------|----------|
| publicKey        | string    | Dieser String muss 66 Zeichen lang sein und mit `02` beginnen | No      |
| publicKey        | string    | Dieser String muss 64 Zeichen lang sein  | No      |


**Example**

Diese Beispiel erstellt ein public/private Key Pair.
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

Dieses Methode gibt den derzeiten public/private Key Pair zürck, der über `.setPair()` gesetzt wurde.

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
Mit dieser Methode wird der eigentliche Struct erstellt. Um diese Methode durchzuführen muss vorher `.setPair()` ausgeführt worden sein.

**Method**
```js
async generate( { messageKey, message, salt } )
```

| Key                | Type     | Description                                       | Required |
|--------------------|----------|---------------------------------------------------|----------|
| messageKey        | string    | Dieser string muss entweder `auth` oder `reddem` sein  | Yes      |
| message        | object    | Hier wird die eigentliche message übergeben  | Yes      |
| salt        | string    | Hier kann ein salt übergeben werden.   | No     |

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