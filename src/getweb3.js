import Web3 from 'web3';
import config from './build_contracts/Bloc.json';

export const CONTRACT_ADDRESS = config.networks['80001'].address;
export const CONTRACT_ABI = config.abi;

// export const web3 = new Web3(Web3.givenProvider || "https://eth-goerli.public.blastapi.io");
export const web3 = new Web3(window.ethereum);
export const todoContract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);



export default {
    CONTRACT_ADDRESS,
    CONTRACT_ABI,
    web3,
    todoContract
};