const Web3 = require('web3')
const fs = require('fs');

//testnet rpc
const web3 = new Web3('http://192.168.1.174:8503')

if (process.argv.length < 2 + 1) {
    console.error('args error. must have a file contains txs. one line a tx hash')
    return
}
const filepath = process.argv[2]
try {
    const data = fs.readFileSync(filepath, 'UTF-8');
    const lines = data.split(/\r?\n/);
    lines.forEach((line) => {
        web3.eth.getTransactionReceipt(line, (err, result) => {
            if (err === null && result !== null) {
                console.log(line, "\t", "OK");
            } else {
                console.log(line, "\t", "--");
            }
        })
    });
} catch (err) {
    console.error(err);
    return
}

