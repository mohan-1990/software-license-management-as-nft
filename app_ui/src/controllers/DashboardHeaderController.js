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

async function getPrimaryAccount() {
    const accounts = await ethereum.request({ method: 'eth_accounts' });
    return accounts[0];
}

async function initiateWalletConnection() {
    try {
        let walletName;
        if(isWalletInstalled()) {
            if(isMetamaskInstalled()) {
                walletName = "Metamask";
            }
            else {
                walletName = "Unknown wallet";
            }
        }
      
        await ethereum.request({ method: 'eth_requestAccounts' });
        let account = await getPrimaryAccount();

        setLocalStorage([
            'walletName',
            'account',
            'networkId',
            'isWalletConnected'
        ],[
            walletName,
            account,
            window.ethereum.networkVersion,
            true
        ])
        
        return {
            walletName: walletName,
            account: account,
            networkId: window.ethereum.networkVersion,
            isWalletConnected: true
        };
    } catch (error) {
      console.error("Some error when intiating connection with metamask: ", error);
    }
}

function setLocalStorage(names, values) {
    for(let i=0; i<names.length; ++i) {
        localStorage[names[i]] = values[i];
    }
}

function clearLocalStorage(names) {
    for(let i=0; i<names.length; ++i) {
        localStorage[names[i]] = null;
    }
}

function signout($router) {
    console.log("Sign out function called!");
    clearLocalStorage([
        'emailId',
        'firstName',
        'lastName',
        'walletName',
        'account',
        'networkId',
        'isWalletConnected'
    ]);

    $router.push({path: '/sign-in'});
                
}

export default ({
    signout: signout,
    initiateWalletConnection: initiateWalletConnection
})