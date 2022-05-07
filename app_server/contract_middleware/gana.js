const Web3 = require('web3');
const contract = require('truffle-contract');
const ganaABI = require('../../build/contracts/Gana.json');
const _ = require('underscore');


// Read JSON and attach RPC connection (Provider)
var gana = contract(ganaABI);
var provider = new Web3.providers.WebsocketProvider("ws://127.0.0.1:7545");
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
    //subscribeToEvent('Transfer', TransferEvent);
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
            dateTime: [],
            to: []
        };

        for(let i=0; i<trasferHistory.timeStamp.length; ++i){
            let timeStamp = trasferHistory.timeStamp[i].toNumber();
            let dateTime = new Date(timeStamp * 1000);
            response['dateTime'].push(dateTime);
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
            tx.logs[0].args[1].toUpperCase() === to.toUpperCase()) {
                response = tx.logs[0].args[2].toNumber();
            }
        else {
            return response = -1;
        }
    }
    catch(error) {
        let message = "Some error when calling mint for address: " + to;
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

function subscribeToEvent(eventName, callback) {
    // Below code snippet copied with thanks and modification from 
    // https://medium.com/coinmonks/how-to-subscribe-smart-contract-events-using-web3-1-0-93e996c06af2
    const subscribedEvents = {};
    const eventJsonInterface = _.find(contractInstance.contract._jsonInterface, 
        o => o.name === eventName && o.type === 'event');
    const subscription = web3.eth.subscribe('logs', {
        address: contractAddress,   
        topics: [eventJsonInterface.signature]  
    }, async function (error, result) 
    {    
        if (!error) 
        {      
            const eventObj = web3.eth.abi.decodeLog(eventJsonInterface.inputs, 
                result.data, result.topics.slice(1));      
            // console.log(`New ${eventName}!`, eventObj)
            await callback(eventObj);    
        }
        else {
            console.error(`Error in contract event sbscription ${eventName}`, error);
        }  
    });  
    subscribedEvents[eventName] = subscription
}

module.exports = {
    init: init,
    retrieveTransferCounts: retrieveTransferCounts,
    retrieveTransferHistory: retrieveTransferHistory,
    mint: mint,
    getContractInstanceConstants: getContractInstanceConstants,
    subscribeToEvent: subscribeToEvent
}