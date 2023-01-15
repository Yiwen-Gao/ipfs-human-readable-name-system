const Eth = require('web3-eth');

const INFURA_API_KEY = 'cb510badbd944b0983cc6090f64b305e';
const INFURA_URL = `https://goerli.infura.io/v3/${INFURA_API_KEY}`;
const LOCAL_URL = 'http://127.0.0.1:8545';
const CONTRACT_ADDRESS = '0x476c2f9d0a7c7E77eC7D5Cb1eD15bf53e0aC8F1B';
const abi = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            }
        ],
        "name": "getCID",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
];

const provider = new Eth.providers.HttpProvider(LOCAL_URL);
const eth = new Eth(Eth.givenProvider || provider);
const IPFSNameSystem = new eth.Contract(abi, CONTRACT_ADDRESS);

exports.getCIDForDomainName = (name: string): Promise<string> => {
    return IPFSNameSystem.methods.getCID(name)
        .call({from: eth.defaultAccount})
        .then((result: string) => result)
        .catch((error: any) => {
            console.log(`Is there a name system record on chain? Failed to get CID for "${name}":`, error);
            return '';
        });
}
