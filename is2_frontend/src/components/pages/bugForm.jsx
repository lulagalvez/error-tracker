import React, {useState} from 'react'
//import '../css/bugForm.css'
import APIService from './APIService'

export default (props) =>{
    const[inputValues,setInputValues] =useState({title:'', description:'',pasos:"",software:1})
    const[show,setShow]=useState(false);
    const hideSuccess = () => {
        setShow(false);
      };
    const showSuccess= () =>{
        setShow(true);
    };
    const apiservice=new APIService();
    const reportBug= () =>{
        apiservice.post('reports',{title: inputValues.title, description: inputValues.description, user_id:1, dev_id:null, software: inputValues.software, state:null,urgency:null})
        .then(response =>{
            if(response.message=== 'Reporte creado'){

            }
            else{

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
        
        <div class='container  mt-4 mb-4 border' >
        
            <h1 className='titulo'>{props.title}</h1>
            <div class="mt-4 mb-4 md-4 lx-4 border">
                <form onSubmit={handleSubmit} >

                    <div class="form-floating mb-4 col-4">
                        <input name='title' class="form-control" id= "floatingTitle"placeholder='Titulo del ticket' maxLength={30} required
                        onChange={handleOnChange} value={inputValues.title} ></input>
                        <label for="floatingTitle">Título del ticket</label>
                    </div>
                    <div class="mb-4 col-3">
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
                    <input type="file" class="form-control"></input>

                    {/* <style>{` .red {color: red}     .green {color: green}`}</style>  */}
                    
                    <button type='submit' class='btn btn-info' > <a>{props.title}</a></button>
                </form>
            </div>
        </div>
        <div class="container mt-9 mb-9">
            <div class="alert alert-success alert-dismissible fade show" role="alert" id="alert-success">
                <strong> Reporte enviado</strong> 
                   <button type="button" class="btn-close" data-bs-dismiss="alert-success" aria-label="Close" id="close-success" onClick={hideSuccess}></button>
            </div>
            <div class="alert alert-danger alert-dismissible collapsable fade show" role="alert" id="alert-fail">
                <strong>¡Error! Reporte no enviado</strong>
                  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" id="close-fail"></button>
            </div>
        </div>
        </>
        
    )

}
