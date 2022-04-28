import axios from "axios";

function submit(e, $form, $router) {
    // console.log("Submit function called!");
    e.preventDefault();
    $form.validateFields((err, values) => {
        if ( !err ) {
            // console.log('Received values of form: ', values) ;
            const params = { emailId: values['email'], password: values['password'] };
            const authAPI = process.env.VUE_APP_GLOBAL_API + '/auth';
              axios.post(authAPI, params).then(response => {
                if(response.status == 200) {
                    $router.push({path: '/sign-up'});
                }
                else {
                    console.log("Unknown response code.");
                }
            }).catch(error => {
                if(error.response.status == 401) {
                    console.log("Invalid crdentials. Please try again with valid credentials.");
                }
                else {
                    console.error("Some error when authentiating user. ", error);
                }
            });
        }
    });
}

export default ({
    submit: submit
})