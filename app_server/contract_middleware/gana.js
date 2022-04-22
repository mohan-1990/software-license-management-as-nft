const Web3 = require('web3');
const contract = require('truffle-contract');
const ganaABI = require('../../build/contracts/Gana.json');


// Read JSON and attach RPC connection (Provider)
var gana = contract(ganaABI);
var provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");
var web3 = new Web3(provider);
gana.setProvider(provider);
var contractInstance = null;
var accounts = null;
const contractAddress = "0xd838D6eAC02694A492C37a4B88Be9B5421Deb179";
const zeroAddress = "0x0000000000000000000000000000000000000000";

// Gana contract current instance constants

var contractInstanceConstants;

async function init() {
    await unlockAccounts();
    await initContract();
}

async function unlockAccounts() {
    accounts = await web3.eth.getAccounts();
    let mnemonic = "gold cluster wink custom bone section payment lift lizard plug rifle stereo";
    for(let i=0; i<accounts.length; ++i) {
        web3.eth.personal.unlockAccount(accounts[i], mnemonic);
    } 
    console.log("Gana contract middleware initialized.");
    console.log("Available accounts: " + JSON.stringify(accounts));
}

async function initContract() {
    contractInstance = await gana.at(contractAddress);
    console.log("Connected to gana contract at address: " + contractInstance.address);
    contractInstanceConstants = {
        'availabeAccounts': accounts,
        'owner': accounts[0]
    };
}

async function retrieveTransferCounts(tokenId) {
    let response = null;
    try {
        let trasferCount = await contractInstance.retrieveTransferCounts(tokenId, {from: accounts[0]});
        response = trasferCount.toNumber();
    }
    catch(error) {
        let message = "Some error when calling retrieveTransferCounts for tokenId: " + tokenId;
        console.error(message, error);
        response = message;
    }
    finally {
        return response;
    }
}

async function retrieveTransferHistory(tokenId) {
    let response = null;
    try {
        let trasferHistory = await contractInstance.retrieveTransferHistory(tokenId, {from: accounts[0]});
        response = {
            timeStamp: [],
            to: []
        };

        for(let i=0; i<trasferHistory.timeStamp.length; ++i){
            response['timeStamp'].push(trasferHistory.timeStamp[i].toNumber());
        }

        response['to'] = trasferHistory.to;
    }
    catch(error) {
        let message = "Some error when calling retrieveTransferHistory for tokenId: " + tokenId;
        console.error(message, error);
        response = message;
    }
    finally {
        return response;
    }
}

async function mint(to) {
    let response = null;
    try {
        let tx = await contractInstance.mint(to, {from: accounts[0]});
        if (tx.logs[0].args[0] === zeroAddress && 
            tx.logs[0].args[1] === to) {
                response = tx.logs[0].args[2].toNumber();
            }
        else {
            return response = -1;
        }
    }
    catch(error) {
        let message = "Some error when calling retrieveTransferHistory for tokenId: " + tokenId;
        console.error(message, error);
        response = message;
    }
    finally {
        return response;
    }
}

async function getContractInstanceConstants() {
    return contractInstanceConstants;
}

module.exports = {
    init: init,
    retrieveTransferCounts: retrieveTransferCounts,
    retrieveTransferHistory: retrieveTransferHistory,
    mint: mint,
    getContractInstanceConstants: getContractInstanceConstants
}