import Web3 from 'web3';
import config from './build_contracts/Bloc.json';

export const CONTRACT_ADDRESS = config.networks['5777'].address;
export const CONTRACT_ABI = config.abi;

export const web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:7545');
export const todoContract = new web3.eth.Contract(CONTRACT_ABI,CONTRACT_ADDRESS);



export default {
    CONTRACT_ADDRESS,
    CONTRACT_ABI,
    web3,
    todoContract
};