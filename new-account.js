const Accounts = require('web3-eth-accounts');
const Web3 = require('web3')
const web3 = new Web3()

const accounts = new Accounts();

const { address, privateKey } = accounts.create(web3.utils.randomHex(32));
console.log({privateKey,address});