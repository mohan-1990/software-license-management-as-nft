import axios from "axios";

function submit(e, $form, $router, $ctx) {
    // console.log("Submit function called!");
    e.preventDefault();
    $ctx.errorMsgVisible = false;
    $form.validateFields((err, values) => {
        if ( !err ) {
            // console.log('Received values of form: ', values) ;
            const params = { emailId: values['email'], password: values['password'] };
            const authAPI = process.env.VUE_APP_USER_API + '/auth';
              axios.post(authAPI, params).then(response => {
                if(response.status == 200) {
                    localStorage.emailId = response.data['emailId'];
                    localStorage.firstName = response.data['firstName'];
                    localStorage.lastName = response.data['lastName'];
                    $router.push({path: '/discover'});
                }
                else {
                    console.log("Unknown response code.");
                }
            }).catch(error => {
                if(error.response.status == 401) {
                    let msg = "Invalid crdentials. Please try again with valid credentials.";
                    $ctx.errorMsg = msg;
                    $ctx.errorMsgVisible = true;
                    console.log(msg);
                }
                else {
                    console.error("Some error when authentiating user. ", error);
                }
            });
        }
    });
}

function errorMsgHandleClose($ctx) {
    $ctx.errorMsgVisible = false;
}

export default ({
    submit: submit,
    errorMsgHandleClose: errorMsgHandleClose
})