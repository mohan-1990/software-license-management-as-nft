import axios from "axios";

function signout($router) {
    console.log("Sign out function called!");
    localStorage.emailId = null;
    localStorage.firstName = null;
    localStorage.lastName = null;
    $router.push({path: '/sign-in'});
                
}

export default ({
    signout: signout
})