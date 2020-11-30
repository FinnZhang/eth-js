const Web3 = require('web3')
var Tx = require('ethereumjs-tx')

//kovan testnet rpc
const web3 = new Web3('https://kovan.infura.io/v3/71233863357e4636b5888f98ded4158b')

const privateKey = Buffer.from('a4c19760aaa9fac64d4e09c78e8af79233c547784dafee38bbfc3db0321fbf34', 'hex')
const accountFrom = '0x01f933904539fe8662c48392ee31c0afcf98758e'
const accountTo = '0xE5a5bd8678785e0832909b0a36C458A1c36B7094'

web3.eth.getTransactionCount(accountFrom, (err, txCount) => {
    if (err !== null) {
        console.error(err);
        return
    }
    const txObject = {
        nonce: web3.utils.toHex(txCount),
        gasLimit: web3.utils.toHex(21000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('20', 'gwei')),
        from: accountFrom,
        to: accountTo,
        value: web3.utils.toHex(web3.utils.toWei('1', 'ether'))
    }

    const tx = new Tx(txObject)
    tx.sign(privateKey)

    const serializedTx = tx.serialize()
    const raw = '0x' + serializedTx.toString('hex')

    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
        console.log('err:', err, 'txHash:', txHash)
    })
})
