import axios from "axios";
import dashboardHeaderController from "./DashboardHeaderController";

function retrieveTokenOwnershipHistory(tokenId) {
  return new Promise((resolve, reject) => {
    console.log("DiscoverController -> retrieveTokenOwnershipHistory function called with params: " + tokenId);
    const tokenOwnershipHistoryAPI = process.env.VUE_APP_TOKEN_GANA_API + '/transferhistory?id=' + tokenId;
    axios.get(tokenOwnershipHistoryAPI).then(response => {
      if(response.status == 200 && typeof(response.data) === typeof({})) {
          let ownershipHistory = [];
          let finalIndex = response.data["dateTime"].length - 1;
          for(let i=finalIndex; i>=0; --i) {
            ownershipHistory.push({
              index: i,
              dateTime: response.data["dateTime"][i],
              to: response.data["to"][i]
            });
          }
          resolve(ownershipHistory);
      }
      else {
          console.error("Some error occurrd when retrieving ownership history. ", JSON.stringify(response));
          reject(null);
      }
      }).catch(error => {
        console.error("Some error occurrd when retrieving ownership history. ", error);
        reject(null);
      });
  });
}

function retrieveNFTs() {
  return new Promise((resolve, reject) => {
    console.log("DiscoverController -> retrieveNFTs function called");
    const nftsAPI = process.env.VUE_APP_TOKEN_GANA_API + '/tokens';
    axios.get(nftsAPI).then(response => {
      if(response.status == 200 && typeof(response.data) === typeof({})) {
          let nfts = [];
          for(let i=0; i<response.data.length; ++i) {
            let nft = [];
            nft.push(response.data[i]);
            nfts.push(nft);
          }
          resolve(nfts);
      }
      else {
          console.error("Some error occurrd when retrieving nfts. ", JSON.stringify(response));
          reject(null);
      }
      }).catch(error => {
        console.error("Some error occurrd when retrieving nfts. ", error);
        reject(null);
      });
  });
}

async function requestTokenTransfer($ctx, tokenId, title) {
  console.log("requestTokenTransferfunction called for tokenId: " + tokenId);

  $ctx.requestTransferModalTitle = 'Request transfer of token ' + title;
  $ctx.isTransferRequestInProgress = true;

  let account;
  if(localStorage.isWalletConnected === true) {
    account = localStorage.account;
  }
  else {
    let walletInfo = await dashboardHeaderController.initiateWalletConnection();
    account = walletInfo['account'];
  }

  const params = { tokenId: tokenId, requesterAddress: account };
  const requestTokenTransferAPI = process.env.VUE_APP_TOKEN_GANA_API + '/reqtokentransfer';
    axios.post(requestTokenTransferAPI, params).then(response => {
      if(response.status == 200 && !(response.data.indexOf("not found") > 0)) {
          $ctx.requestTransferModalType = 'success';
      }
      else {
        $ctx.requestTransferModalType = 'error';
      }
      $ctx.requestTransferModalMessage = response.data;
      $ctx.isTransferRequestInProgress = false;
      $ctx.isRequestTransferModalVisible = true;
      $ctx.pendingTransferRequestSuccessful = true;
  }).catch(error => {
      let message = "Some error occurred in the server when requesting token transfer. Please check browser console for more details.";
      $ctx.requestTransferModalType = 'error';
      $ctx.requestTransferModalMessage = message;
      $ctx.isTransferRequestInProgress = false;
      $ctx.isRequestTransferModalVisible = true;
      $ctx.pendingTransferRequestSuccessful = false;
      console.error(error);
  });
}

function retrievePendingTransfers(account) {
  return new Promise((resolve, reject) => {
    console.log("retrievePendingTransfers called for account: " + account);

    const pendingTransfersAPI = process.env.VUE_APP_TOKEN_GANA_API + '/pendingtransfers?address=' + account + 
    '&filterby=requesterAddress&returnfields=tokenId';
      axios.get(pendingTransfersAPI).then(response => {
        if(response.status === 200) {
            let pendingTransferTokenIds = [].concat(response.data.map(x => x.tokenId));
            console.log("Pending transfer token ids: " + JSON.stringify(pendingTransferTokenIds));
            resolve(pendingTransferTokenIds);
        }
    }).catch(error => {
        let message = "Some error occurred in the server when requesting pending token transfers. Please check browser console for more details.";
        console.error(message, error);
        reject(null);
    });
  });
}

export default ({
    retrieveTokenOwnershipHistory: retrieveTokenOwnershipHistory,
    retrieveNFTs: retrieveNFTs,
    requestTokenTransfer: requestTokenTransfer,
    retrievePendingTransfers: retrievePendingTransfers,
})