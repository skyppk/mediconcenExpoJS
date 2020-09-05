import service from "./config";

// email, password, clinic, phone, address

const getAllRecords =  (callback) => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJiaWxsbGxsZ3N5QGV4YW1wbGUuY29tIiwiaWF0IjoxNTk5MzE3OTMyLCJleHAiOjE1OTkzMTg5MzJ9.1gmDE_0VbhLWsJKoENobo7ZxMYYR2gbY32m0yj0pqCs';
    const jwtToken = 'Bearer ' + token;

    service.get('/consultationRecord' ,{ headers:{'Authorization': jwtToken}})
        .then(callback)
        .catch(err => console.log(err));

}

export default getAllRecords

