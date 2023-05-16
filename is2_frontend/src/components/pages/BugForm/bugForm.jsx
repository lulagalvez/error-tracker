import React, {useState, useEffect} from 'react'
import '../css/bugForm.css'
import APIService from '../APIService'
export default (props) =>{
    const[inputValues,setInputValues] =useState({title:'', description:'',pasos:"",software:1});
    const[showErrorAlert,setShowErrorAlert]=useState(false);
    const[showSuccessAlert,setShowSuccessAlert]=useState(false);


    const apiservice=new APIService();
    const reportBug = () =>{
        apiservice.post('reports',{title: inputValues.title, description: inputValues.description, user_id:1, dev_id:null, software: inputValues.software, state:null,urgency:null})
        .then(response =>{
            if(response?.message=== 'Reporte creado'){
                setShowSuccessAlert(true);
                
            }
            
            else{
                setShowErrorAlert(true);
            }
        })
        .catch(error => console.log('error',error))
    }

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
        
        <div class='container  mt-4 mb-4 border border-2 position-relative' style={{width:"657px", height:"807px", padding: "60px"}} >
            <div class="position-absolute start-50 translate-middle">
            <h1  className="titulo">{props.title}</h1>
            </div>
            <div class=" mx-auto mt-4 mb-4 md-4 lx-4" style={{padding:"60px", width:"500px"}}>
                <form onSubmit={handleSubmit} >

                    <div class="form-floating mb-4">
                        <input name='title' class="form-control" id= "floatingTitle"placeholder='Titulo del ticket' maxLength={30} required
                        onChange={handleOnChange} value={inputValues.title} ></input>
                        <label for="floatingTitle">Título del ticket</label>
                    </div>
                    <div class="mb-4 ">
                        <select name='software' class="form-select" required onChange={handleOnChange} value={inputValues.software } > 
                            <option value='1'>Software 1</option>
                            <option value='2'>Software 2</option>
                        </select>
                    </div>

                    <div class="form-floating mb-3">
                        <textarea name='description' id="floatingDescription" class="form-control" style={{height: "130px", resize: "none"}} placeholder='Descripción detallada del bug' required 
                        onChange={handleOnChange} value={inputValues.description } ></textarea>
                        <label for="floatingDescription">Descripción detallada del bug</label>
                    </div>  

                    <div class="form-floating mb-3">
                        <textarea name='pasos' class="form-control" id="floatingSteps" style={{height: "130px", resize: "none"}} placeholder='Pasos detallados para reproducir el bug' required
                        onChange={handleOnChange} value={inputValues.pasos }  ></textarea>
                        <label for="floatingSteps">Pasos detallados para reproducir el bug</label>
                    </div>
                    <div class="mb-3">
                    <input type="file" class="form-control"></input>
                    </div>
                    <div class="mb-5 position-absolute start-50 translate-middle-x">
                    <button type='submit' class='btn btn-info' > <a>{props.title}</a></button>
                    </div>
                </form>
            </div>
            <div class="container mt-9 mb-9">

      
            <div class="alert alert-success alert-dismissible fade show" role="alert" id="alert-success" style={showSuccessAlert?{display:"block"}:{display:'none'}}>
                <strong> Reporte enviado</strong> 
                   <button type="button" class="btn-close" data-bs-toggle="collapse" data-bs-target="#alert-success" aria-label="Close" aria-controls="alert-success" id="close-success" onClick={()=>setShowSuccessAlert(false)}></button>
            </div>

            

            <div class="alert alert-danger alert-dismissible fade show " role="alert" id="alert-fail" style={showErrorAlert?{display:"block"}:{display:'none'}}>
                <strong>¡Error! Reporte no enviado</strong>
                  <button type="button" class="btn-close" data-bs-toggle="collapse" data-bs-target="#alert-fail" aria-label="Close" aria-controls="alert-fail" id="close-fail" onClick={()=>setShowErrorAlert(false)}></button>
            </div>

        </div>
        </div>


        </>
        
    )

}
