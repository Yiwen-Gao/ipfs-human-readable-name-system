import Web3 from "web3";
// import Eth from 'web3-eth';
import { AbiItem } from 'web3-utils';

let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
// let eth = new Eth(Eth.givenProvider || 'ws://localhost:8545');
const abi: AbiItem[] = [
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
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
];

const contractAddress = '0x6B3E385A08576Bd1B2627BCC3dd1BF370b5aA482';
const IPFSNameSystem = new web3.eth.Contract(abi, contractAddress);

export function getCIDForDomainName(name: string): Promise<string> {
    return IPFSNameSystem.methods.getCID(name);
}
