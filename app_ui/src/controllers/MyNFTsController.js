import axios from "axios";

function isWalletInstalled() {
    //Have to check the ethereum binding on the window object to see if it's installed
    const { ethereum } = window;
    return Boolean(ethereum);
}

function isMetamaskInstalled() {
    //Have to check the ethereum binding on the window object to see if it's installed
    const { ethereum } = window;
    return Boolean(ethereum.isMetaMask);
}

async function initiateWalletConnection($ctx) {
    try {
      if(isWalletInstalled()) {
          if(isMetamaskInstalled()) {
            $ctx.walletName = "Metamask";
          }
          else {
            $ctx.walletName = "Unknown wallet";
          }
      }
      
      await ethereum.request({ method: 'eth_requestAccounts' });
      let account = await getPrimaryAccount();
      $ctx.account = account;
      $ctx.networkId = window.ethereum.networkVersion;
      $ctx.isWalletConnected = true;

      $ctx.bus.$emit('walletConnected', {
        account: account,
        networkId: window.ethereum.networkVersion
      });

    } catch (error) {
      console.error("Some error when intiating connection with metamask: ", error);
    }
};

async function getPrimaryAccount() {
    const accounts = await ethereum.request({ method: 'eth_accounts' });
    return accounts[0];
}

function mint(params, $ctx) {
  $ctx.confirmMinting = true;
  console.log("MyNFTsController -> Mint function called with params: " + JSON.stringify(params));
  const mintAPI = process.env.VUE_APP_TOKEN_GANA_API + '/new';
  axios.post(mintAPI, params).then(response => {
    if(response.status == 200) {
        $ctx.confirmMinting = false;
        let counter = 5;
        let timer = setInterval(() => {
          if(counter == 0) {
            $ctx.displayMintModal = false;
            clearTimeout(timer);
          }
          else {
            let message = response.data + ". This modal window will close automatically in " + 
            counter + " seconds";
            $ctx.bus.$emit("msgToUser", {
              msg: message,
              type: 'success'
            });
            counter--;
          } 
        }, 1000);
        $ctx.bus.$emit("newNFTMintSuccess");
    }
    else if(response.staus == 400) {
        $ctx.bus.$emit("msgToUser", {
          msg: response.data,
          type: 'error'
        });
        $ctx.confirmMinting = false;
    }
    else {
        $ctx.bus.$emit("msgToUser", {
          msg: response.data,
          type: 'error'
        });
        $ctx.confirmMinting = false;
    }
}).catch(error => {
    console.error("Some error occurrd when minting new software license NFT. ", error);
    $ctx.bus.$emit("msgToUser", {
      msg: error,
      type: 'error'
    });
    $ctx.confirmMinting = false;
  });
}

function retrieveTokenOf(owner) {
  return new Promise((resolve, reject) => {
    console.log("MyNFTsController -> retrieveTokenOf function called with params: " + owner);
    const retrieveNFTsOfOwnerAPI = process.env.VUE_APP_TOKEN_GANA_API + '/tokensof?owner=' + owner;
    axios.get(retrieveNFTsOfOwnerAPI).then(response => {
      if(response.status == 200) {
          let nfts = response.data;
          let transformedData = nfts.map((item, index) => {
            return {
              key: index,
              tokenId: item['tokenId'],
              description: item['description'],
              ownerAddress: item['ownerAddress'],
              nft: {
                title: item['title'],
                image_url: item['image_url']
              },
              created_at: item['created_at']
            }
          });
          resolve(transformedData);
      }
      else {
          console.error("Some error occurrd when retrieving s/w license NFTs. ", JSON.stringify(response));
          reject(null);
      }
      }).catch(error => {
        console.error("Some error occurrd when retrieving s/w license NFTs. ", error);
        reject(null);
      });
  });
}

export default ({
    initiateWalletConnection: initiateWalletConnection,
    mint: mint,
    retrieveTokenOf: retrieveTokenOf
})