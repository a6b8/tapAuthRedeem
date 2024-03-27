import { TapAuthRedeem } from "../src/TapAuthRedeem.mjs"

const tapAuthRedeem = new TapAuthRedeem()

console.log( '####### RANDOM PAIR ########' )
tapAuthRedeem.setPair( {} )
console.log( tapAuthRedeem.getPair() )
console.log()

console.log( '####### AUTH RESULT ########' )
const authResult = await tapAuthRedeem.generate( {
    'messageKey': 'auth',
    'message': [ 'gib' ],
    'salt': Math.random()
} )
console.log( authResult )
console.log()


console.log( '####### REDEEM RESULT ########' )
const redeemResult = await tapAuthRedeem.generate( {
    'messageKey': 'redeem',
    'message': {
        'items': [
            {
                "tick": "gib",
                "amt": "546",
                "address" : "bc1p9lpne8pnzq87dpygtqdd9vd3w28fknwwgv362xff9zv4ewxg6was504w20"
            }
        ],
        'auth': 'fd3664a56cf6d14b21504e5d83a3d4867ee256f06cbe3bddf2787d6a80a86078i0',
        'data': ''
    },
    'salt': Math.random()
} )
console.log( redeemResult )