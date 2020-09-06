import service from "./config";

const login =  (loginState,callback, errcallback) => {
    const params = new URLSearchParams();
    params.append('grant_type', 'password');
    params.append('email',loginState.emailText);
    params.append('password',loginState.passwordText);
    service.post('/oauth2/token', params)
        .then(callback)
        .catch(errcallback);

}

export default login

