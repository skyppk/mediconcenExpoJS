import service from "./config";

const setAuthorization = (token) => {
    if (token){
        service.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete service.defaults.headers.common['Authorization'];
    }
}

export default setAuthorization