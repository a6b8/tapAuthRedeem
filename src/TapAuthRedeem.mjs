import * as secp from '@noble/secp256k1'
import secp256k1 from 'secp256k1'
import { createHash } from 'node:crypto'

import { printMessages } from './helpers/mixed.mjs'
import { config } from './data/config.mjs'


class TapAuthRedeem {
    #pair
    #silent
    #config


    constructor( silent=false ) {
        this.#silent = silent
        this.#config = config

        this.#pair = {
            'publicKey': null,
            'privateKey': null
        }

        return true
    }


    setPair( { publicKey, privateKey } ) {
        const { messages, comments } = this.#validateSetPair( { publicKey, privateKey } )
        !this.#silent ? printMessages( { messages, comments, 'silent': this.#silent } ) : ''


        if( publicKey === undefined || privateKey === undefined ) {
            console.log( 'Set Example Key Pair' )
            const { pk, pub } = this.#createExampleKeyPair()
            publicKey = pub
            privateKey = pk
        }

        this.#pair = {
            'publicKey': publicKey,
            'privateKey': privateKey
        }

        return true
    }


    getPair() {
        return this.#pair
    }


    async generate( { messageKey, message, salt='' } ) {
        const { messages, comments } = this.#validateGenerate( { messageKey, message, salt } )
        !this.#silent ? printMessages( { messages, comments, 'silent': this.#silent } ) : ''

        let privateKey = Buffer.from( this.#pair['privateKey'], 'hex' )
        let publicKey = Buffer.from( this.#pair['publicKey'], 'hex' )
    
        let proto = {
            'p' : 'tap',
            'op' : 'token-auth',
            'sig': null,
            'hash' : null,
            'salt' : `${salt}`
        }

        const msgHash = this.#getMessageHash( { message, salt } )
        const signature = await secp.signAsync( msgHash, privateKey )
    
        proto[ messageKey ] = message
        proto['sig'] = { 
            'v' : `${signature.recovery}`, 
            'r' : signature.r.toString(), 
            's' : signature.s.toString()
        }
        proto['hash'] = Buffer.from( msgHash ).toString( 'hex' )
    
        const test = this.#testAuth( { proto, messageKey, signature, publicKey, msgHash } )
        const result = JSON.stringify( proto )
        return { test, proto }
    }


    #createExampleKeyPair() {
        let privateKey, publicKey
    
        do {
            privateKey = secp.utils.randomPrivateKey()
        } while( !secp256k1.privateKeyVerify( privateKey ) )
        publicKey = secp.getPublicKey( privateKey )

        const result = {
            'pk': Buffer.from( privateKey ).toString( 'hex' ),
            'pub': Buffer.from( publicKey ).toString( 'hex' )
        }

        return result 
    }


    #testAuth( { proto, messageKey, signature, publicKey, msgHash } ) {
        const test_proto = JSON.parse( JSON.stringify( proto ) )
        let test_msgHash = this.#getMessageHash( { 
            'message': test_proto[ messageKey ], 
            'salt': test_proto['salt']
        } )

        const isValid = secp.verify( signature, test_msgHash, publicKey )
        let test = new secp.Signature( 
            BigInt( proto['sig']['r'] ), 
            BigInt( proto['sig']['s'] ), 
            parseInt( proto['sig']['v'] )
        )

        const result = {
            isValid,
            'publicKey': Buffer.from( publicKey ).toString( 'hex' ),
            'publicKeyRecovered': test.recoverPublicKey( msgHash ).toHex()
        }

        return result
    }


    #getMessageHash( { message, salt } ) {
        let content = ''
        content += JSON.stringify( message )
        content += salt

        return createHash( 'sha256' )
            .update( content )
            .digest()
    }


    #validateSetPair( { publicKey, privateKey } ) {
        const messages = []
        const comments = []

        const n = [
            [ publicKey, 'publicKey' ],
            [ privateKey, 'privateKey' ]
        ]
            .forEach( ( a ) => {
                const [ value, key ] = a 
                if( value === undefined ) {
                    comments.push( `Key: ${key} is "undefined". Keys will created.` )
                } else if( typeof value !== 'string' ) {
                    messages.push( `Key: ${key} is not type of "string".` )
                } else {
                    switch( key ) {
                        case 'publicKey':
                            if( !secp256k1.publicKeyVerify( Buffer.from( value, 'hex' ) ) ) {
                                messages.push( 'Invalid Private Key' )
                            }
                            break
                        case 'privateKey':
                            if( !secp256k1.privateKeyVerify( Buffer.from( value, 'hex' ) ) ) {
                                messages.push( 'Invalid Private Key' )
                            }
                            break
                        default:
                            console.log( 'Invalid Key Type' )
                            break
                    }
                }
            } )

        return { messages, comments }
    }


    #validateGenerate( { messageKey, message, salt } ) {
        const messages = []
        const comments = []

        if( messageKey === undefined ) {
            messages.push( 'Message Key is "undefined".' )
        } else if( typeof messageKey !== 'string' ) {
            messages.push( 'Message Key is not type of "string".' )
        } else if( !this.#config['validate']['messageKeys'].includes( messageKey ) ) {
            messages.push( `Message Key is not in the list of valid message keys. Use instead: ${this.#config['messageKeys'].join( ', ' )}.` )
        }

        return { messages, comments }
    }
}


export { TapAuthRedeem }

