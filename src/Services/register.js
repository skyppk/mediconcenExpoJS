import service from "./config";

// email, password, clinic, phone, address

const register =  (registerState,  callback) => {
    const params = new URLSearchParams();

    params.append('email',registerState.emailText);
    params.append('password',registerState.passwordText);
    params.append('clinic',registerState.clinicText);
    params.append('phone', registerState.phoneText);
    params.append('address',registerState.addressText);

    service.post('/oauth2/register', params)
        .then(callback)
        .catch(err => console.log(err));

}

export default register

