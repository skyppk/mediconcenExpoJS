import service from "./config";

const login =  (loginState,callback) => {
    const params = new URLSearchParams();
    params.append('grant_type', 'password');
    params.append('email',loginState.emailText);
    params.append('password',loginState.passwordText);
    service.post('/oauth2/token', params)
        .then(callback)
        .catch(err => console.log(err));

}

export default login

