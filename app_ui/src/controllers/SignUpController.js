import axios from "axios";

function submit(e, $form, $router, $ctx) {
    // console.log("Submit function called!");
    e.preventDefault();
    $ctx.successMsgVisible = false;
    $ctx.errorMsgVisible = false;
    $form.validateFields((err, values) => {
        if ( !err ) {
            // console.log('Received values of form: ', values) ;
            const params = { 
                firstName: values['firstname'], 
                lastName: values['lastname'],
                emailId: values['email'],
                phone: values['phone'],
                password: values['password'] 
            };

            if(values['password'] !== values['confirmpassword']) {
                let msg = "Passwords don't match. Please enter same passwords.";
                    $ctx.errorMsg = msg;
                    $ctx.errorMsgVisible = true;
                    console.log(msg);
                    return;
            }

            const authAPI = process.env.VUE_APP_USER_API + '/new';
              axios.post(authAPI, params).then(response => {
                if(response.status == 200) {
                    $ctx.successMsgVisible = true;
                    setTimeout(() => $router.push({path: '/sign-in'}), 5000);
                }
                else if(response.staus == 409) {
                    let msg = "Email id " +  values['email'] + " exists already. Please try again with a different email id.";
                    $ctx.errorMsg = msg;
                    $ctx.errorMsgVisible = true;
                    console.log(msg);
                }
                else {
                    let msg = "Unknown response code.";
                    $ctx.errorMsg = msg;
                    $ctx.errorMsgVisible = true;
                    console.log(msg);
                }
            }).catch(error => {
                if(error.response.status == 409) {
                    let msg = "Email id " +  values['email'] + " exists already. Please try again with a different email id.";
                    $ctx.errorMsg = msg;
                    $ctx.errorMsgVisible = true;
                    console.log(msg);
                }
                else {
                    console.error("Some error when registring user. ", error);
                }
            });
        }
    });
}

function successMsgHandleClose($ctx) {
    $ctx.successMsgVisible = false;
}

function errorMsgHandleClose($ctx) {
    $ctx.errorMsgVisible = false;
}

export default ({
    submit: submit,
    successMsgHandleClose: successMsgHandleClose,
    errorMsgHandleClose: errorMsgHandleClose
})