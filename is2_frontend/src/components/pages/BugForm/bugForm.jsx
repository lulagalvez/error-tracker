import React, {useState, useEffect} from 'react'
import './bugForm.css'
import APIService from '../../services/APIService';
import Cookies from 'js-cookie';
export default (props) =>{
    const[inputValues,setInputValues] =useState({title:'', description:'',pasos:"",software:[]});
    const[showErrorAlert,setShowErrorAlert]=useState(false);
    const[showSuccessAlert,setShowSuccessAlert]=useState(false);
    const[softwareIds,setSoftwareIds]=useState([]);
    const userid = Cookies.get('id');
    const username = Cookies.get('name');   
    console.log(userid,username);
    /*
    ESTADOS POSIBLES
    ToDo
    Pending
    Testing
    Closed

    PRIORIDADES POSIBLES
    1
    2
    3
    4
    5

    SOFTWARES POSIBLES 
    Software1
    Software2
    Software3
    */
   
    const apiservice=new APIService();
    const reportBug = () =>{
        apiservice.post('reports',{title: inputValues.title, description: inputValues.description, user_id:userid, user_name:username, dev_id:null,dev_name:null ,software: inputValues.software, status:"ToDo",urgency:1})
        .then(response =>{
            console.log(response);
            if(response?.message === 'Reporte creado'){
                setShowSuccessAlert(true);
                
            }
            else{
                setShowErrorAlert(true);
            }
        })
        .catch(error => console.log('error',error))
        
    }
    useEffect(() => {
        async function fetchData() {
          const response = await apiservice.get('software');
          setSoftwareIds(response);
        }
        fetchData();
      }, []);
    
    const handleOnChange = event =>{
        const {name,value} =event.target;
        setInputValues({
            ...inputValues,
            [name]:value
        });
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        reportBug();
    }
    
    return(
        <>
        
        <div className='container text-center mb-4 border border-2' style={{width:"657px", height:"807px", padding: "60px"}} >
            <div className="text-center">
            <h1  className="titulo">{props.title}</h1>
            </div>
            <div className=" mx-auto mt-4 mb-4 md-4 lx-4" style={{padding:"60px", width:"500px"}}>
                <form onSubmit={handleSubmit} >

                    <div className="form-floating mb-4">
                        <input name='title' className="form-control" id= "floatingTitle"placeholder='Titulo del ticket' maxLength={30} required
                        onChange={handleOnChange} value={inputValues.title} ></input>
                        <label htmlFor="floatingTitle">Título del ticket</label>
                    </div>
                    <div className="mb-4 ">
                        <select name='software' className="form-select" required onChange={handleOnChange} value={inputValues.software.name } > 
                            <option value="">--Please choose an option--</option>
                                {softwareIds.map(softwareIds => (
                                <option key={softwareIds.id} value={softwareIds.id}>
                                    {softwareIds.name}
                                </option>
                                ))}
                        </select>
                    </div>

                    <div className="form-floating mb-3">
                        <textarea name='description' id="floatingDescription" className="form-control" style={{height: "130px", resize: "none"}} placeholder='Descripción detallada del bug' required 
                        onChange={handleOnChange} value={inputValues.description } ></textarea>
                        <label htmlFor="floatingDescription">Descripción detallada del bug</label>
                    </div>  

                    <div className="form-floating mb-3">
                        <textarea name='pasos' className="form-control" id="floatingSteps" style={{height: "130px", resize: "none"}} placeholder='Pasos detallados para reproducir el bug' required
                        onChange={handleOnChange} value={inputValues.pasos }  ></textarea>
                        <label htmlFor="floatingSteps">Pasos detallados para reproducir el bug</label>
                    </div>
                    <div className="mb-3">
                    <input type="file" className="form-control"></input>
                    </div>
                    <div className="mb-5 position-absolute start-50 translate-middle-x">
                    <button type='submit' className='btn btn-info' > <a>{props.title}</a></button>
                    </div>
                </form>
            </div>
            <div className="container mt-9 mb-9">

      
            <div className="alert alert-success alert-dismissible fade show" role="alert" id="alert-success" style={showSuccessAlert?{display:"block"}:{display:'none'}}>
                <strong> Reporte enviado</strong> 
                   <button type="button" className="btn-close" data-bs-toggle="collapse" data-bs-target="#alert-success" aria-label="Close" aria-controls="alert-success" id="close-success" onClick={()=>setShowSuccessAlert(false)}></button>
            </div>

            <div className="alert alert-danger alert-dismissible fade show " role="alert" id="alert-fail" style={showErrorAlert?{display:"block"}:{display:'none'}}>
                <strong>¡Error! Reporte no enviado</strong>
                  <button type="button" className="btn-close" data-bs-toggle="collapse" data-bs-target="#alert-fail" aria-label="Close" aria-controls="alert-fail" id="close-fail" onClick={()=>setShowErrorAlert(false)}></button>
            </div>

        </div>
        </div>


        </>
        
    )

}
