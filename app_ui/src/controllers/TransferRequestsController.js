import axios from "axios";
import dashboardHeaderController from "./DashboardHeaderController";
import discoverController from "./DiscoverController";
import GanaABI_Full from "../../../build/contracts/Gana.json";
import Web3 from "web3";

const GanaContract = {
  address: process.env.VUE_APP_GANA_CONTRACT_ADDRESS,
  abi_partial: GanaABI_Full.abi.find(x => x["name"] === "safeTransferFrom")
};

async function retrieveTransferRequests() {
  let account;
  if(localStorage.isWalletConnected === true) {
    account = localStorage.account;
  }
  else {
    let walletInfo = await dashboardHeaderController.initiateWalletConnection();
    account = walletInfo['account'];
  }

  return new Promise((resolve, reject) => {
    console.log("TransferRequestsController -> retrieveTransferRequests function called");
    const retrieveTransferRequestsAPI = process.env.VUE_APP_TOKEN_GANA_API + '/pendingtransfers?address=' + account;
    axios.get(retrieveTransferRequestsAPI).then(response => {
      if(response.status == 200) {
          let tokenIds = [];
          let pendingTransfersMap = response.data.reduce((map, pendingTransfer) => {
            map[pendingTransfer['tokenId']] = pendingTransfer;
            tokenIds.push(pendingTransfer['tokenId']);
            return map;
          }, {});

          if(tokenIds.length === 0) {
            resolve([]);
          }
          else {
            discoverController.retrieveNFTs(tokenIds).then(nfts => {
              let transferRequests = nfts.map((x, index) => {
                return {
                  'key': x[0]['tokenId'],
                  'nft': {
                    'title': x[0]['title'],
                    'image_url': x[0]['image_url']
                  },
                  'description': x[0]['description'],
                  'requesterAddress': pendingTransfersMap[x[0]['tokenId']]['requesterAddress'],
                  'ownerAddress': pendingTransfersMap[x[0]['tokenId']]['ownerAddress'],
                  'action_or_message': {
                    'tokenId': x[0]['tokenId'],
                    'account': account.toLowerCase(),
                    'owner': pendingTransfersMap[x[0]['tokenId']]['ownerAddress'].toLowerCase(),
                    'requester': pendingTransfersMap[x[0]['tokenId']]['requesterAddress'],
                    'message': pendingTransfersMap[x[0]['tokenId']]['message']
                  },
                  'request_date': pendingTransfersMap[x[0]['tokenId']]['created_at']
                }
              });
              
              resolve(transferRequests);
            });
          }
      }
      else {
          console.error("Some error occurrd when retrieving transfer requests. ", JSON.stringify(response));
          reject(null);
      }
      }).catch(error => {
        console.error("Some error occurrd when retrieving transfer requests. ", error);
        reject(null);
      });
  });
}

async function transferToken($ctx, from, to, tokenId) {
  $ctx.isTransferRequestInProgress = true;
	console.log("Handle transfer request for token id: " + tokenId + " ; to: " + to);

  try {
    const web3 = new Web3(window.web3.currentProvider);
    let ganaContract = new web3.eth.Contract(GanaABI_Full.abi, GanaContract.address);
    let response = await ganaContract.methods
      .safeTransferFrom(from, to, tokenId)
      .send({ from: window.web3.currentProvider.selectedAddress });
    console.log("response: ", response);
    $ctx.isTransferRequestSuccessful = true;
  }
  catch(error) {
    console.error("Some error occured when calling contract function safeTransferFrom: ", error);
    $ctx.isTransferRequestSuccessful = false;
  }
  finally {
    $ctx.isTransferRequestInProgress = false;
  }
  
}

export default ({
  retrieveTransferRequests: retrieveTransferRequests,
  transferToken: transferToken,
})