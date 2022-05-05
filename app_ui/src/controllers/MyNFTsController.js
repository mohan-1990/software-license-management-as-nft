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
      $ctx.account = await getPrimaryAccount();
      $ctx.networkId = window.ethereum.networkVersion;
      $ctx.isWalletConnected = true;
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
        $ctx.bus.$emit("msgToUser", {
          msg: response.data,
          type: 'success'
        });
        $ctx.confirmMinting = false;
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

export default ({
    initiateWalletConnection: initiateWalletConnection,
    mint: mint
})