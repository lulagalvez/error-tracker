export default class APIService{
    //reportar bug
    static ReportBug(title,description,date){
        return fetch(`http://localhost:5000/reports`,{
            'method':'POST',
            headers: {
                'Content-Type':'application/json'
            },
            title:JSON.stringify(title),
            description:JSON.stringify(description),
            date:JSON.stringify(date)
        })
        .then(response => response.json())
        .catch(error => console.log(error))
    }

}