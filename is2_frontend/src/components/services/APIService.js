import axios from 'axios';

const headers= {
    "Accept" : "application/json",
    'Content-Type': 'application/json',
}

axios.defaults.withCredentials = true;

export default class APIService{
    constructor(){
        this.domain= 'http://localhost:5000';
    }

    post(url, data) {
        const options ={
            headers:{
                'Accept':'application/json',
                'Content-Type': 'application/json'
            }
        }
        return axios.post(`${this.domain}/${url}`, data, options)
            .then(response => response.data)
            .catch(error => console.log(error));
    }
  
    get(url, id) {
        let apiUrl = `${this.domain}/${url}`;
        if (id) {
            apiUrl = `${apiUrl}/${id}`;
        }

        return axios.get(apiUrl)
            .then(response => response.data)
            .catch(error => console.log(error));
    }

    delete(url, id) {
        let apiUrl = `${this.domain}/${url}`;
        if (id) {
            apiUrl = `${apiUrl}/${id}`;
        }

        return axios.delete(apiUrl)
            .then(response => response.data)
            .catch(error => console.log(error));
    }
    
    put(url, id, data) {
        let apiUrl = `${this.domain}/${url}`;
        if (id) {
            apiUrl = `${apiUrl}/${id}`;
        }

        return axios.put(apiUrl, data)
            .then(response => response.data)
            .catch(error => console.log(error));
    }   
}