import React, { useState } from 'react'
// import './Supplier.css'
import Select from 'react-select'
import APIService from '../APIService';


const suppliers = [
  { label: 'Facebook', value: 'Facebook' },
  { label: 'Ig', value: 'Ig' },
  { label: 'Yt', value: 'Yt' },
  { label: 'Nada', value: '' },
]

const bd = [
  { id: 1, name: 'Facebook' },
  { id: 2, name: 'Ig' },
  { id: 3, name: 'Yt' },
  { id: 3, name: 'N/A' },
]

export const SelectDev = () => {
  const apiservice=new APIService();

  const [selectedDev, setSelectedDev] = useState()

  const handleSelectChange = ({ value }) => {   //e
    console.log(value)  //e.value
    setSelectedDev(value)
  }

  // const [options, setOptions] = useState([])
  let list_devs = []
  const [devs,setDevs] = React.useState([]);

  const showData = () =>{
    apiservice.get('devs')
    .then(response =>{
        console.log('devs',response);
        // setDevs(response);
        response.map(function (dato) {
          list_devs.push({ label: dato.name, value: dato.name == 'N/A' ? 'queso' : dato.id })
        })
    })
}

  // let url = 'https://jsonplaceholder.typicode.com/users'
  // fetch(url)
  //   .then(Response => Response.json())
  //   .then(data => {
  //     data.map(function (dato) {
  //       list_devs.push({ label: dato.name, value: dato.name == 'N/A' ? 'queso' : dato.id })
  //     })
  //   }
  //   )
  // .then(data => console.log(data))

  return (
    <div className='Devs-container' style={{ width: '300px' }}>
      <p>{selectedDev}</p>

      <Select
        // defaultValue={{}} //encontrar una forma de seleccionar el valor actual de cada uno
        // options={bd.map(item => ({ label: item.name, value: item.name == 'N/A' ? 'queso' : item.id }))}
        options={list_devs}
        onChange={handleSelectChange}
      />
    </div>
  )
}
