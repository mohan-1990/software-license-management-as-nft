import axios from "axios";

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

export default ({
    retrieveTokenOwnershipHistory: retrieveTokenOwnershipHistory,
    retrieveNFTs: retrieveNFTs
})