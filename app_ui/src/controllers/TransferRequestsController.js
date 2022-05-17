import axios from "axios";
import dashboardHeaderController from "./DashboardHeaderController";
import discoverController from "./DiscoverController";

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
                  'account': account.toLowerCase(),
                  'owner': pendingTransfersMap[x[0]['tokenId']]['ownerAddress'].toLowerCase(),
                  'message': pendingTransfersMap[x[0]['tokenId']]['message']
                },
                'request_date': pendingTransfersMap[x[0]['tokenId']]['created_at']
              }
            });
  
            console.log("Tranfers requests: " + JSON.stringify(transferRequests))
            
            resolve(transferRequests);
          });
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

export default ({
  retrieveTransferRequests: retrieveTransferRequests,
})