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

  /*   request(url,method='POST',data=null){
        url= joinURL(this.domain,url);
        const options={
            headers,
            method,
            mode
        }
        if(data){
            options.body= JSON.stringify({...data})
        }
        return fetch(url,options);
    } */
/*     post(url,data){
        const method = 'POST';
        return this.request(url,method,data)
        .then(response=> response.json())
        .catch(error =>console.log(error));
    } */
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
   /*  get(url,id){
        const method ="GET";
        if(id){
            //fetch single record
            url = `${url}/${id}`;
        }
        return this.request(url,method)
        .then(response => response.json())
        .catch(error => console.log(error));
    } */
    get(url, id) {
        let apiUrl = `${this.domain}/${url}`;
        if (id) {
            apiUrl = `${apiUrl}/${id}`;
        }

        return axios.get(apiUrl)
            .then(response => response.data)
            .catch(error => console.log(error));
    }

 /*    delete(url,id){
        const method = 'DELETE';
        if(id){
            url= `${url}/${id}`;
        }
        return this.request(url,method)
        .then(response => response.json())
        .catch(error => console.log(error));
    } */
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