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

function mint(params) {
  console.log("MyNFTsController -> Mint function called with params: " + JSON.stringify(params));
}

export default ({
    initiateWalletConnection: initiateWalletConnection,
    mint: mint
})