import React, { useState } from 'react'
// import './Supplier.css'
import Select from 'react-select'

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

  const [selectedDev, setSelectedDev] = useState()

  const handleSelectChange = ({ value }) => {   //e
    console.log(value)  //e.value
    setSelectedDev(value)
  }

  // const [options, setOptions] = useState([])
  let list_devs = []

  let url = 'https://jsonplaceholder.typicode.com/users'
  fetch(url)
    .then(Response => Response.json())
    .then(data => {
      data.map(function (dato) {
        list_devs.push({ label: dato.name, value: dato.name == 'N/A' ? 'queso' : dato.id })
      })
    }
    )
  // .then(data => console.log(data))

  return (
    <div className='Devs-container' style={{ width: '300px' }}>
      <p>{selectedDev}</p>

      <Select
        style={{ width: `${(8 * selectedDev) + 100}px` }}
        // defaultValue={{}} //encontrar una forma de seleccionar el valor actual de cada uno
        // options={bd.map(item => ({ label: item.name, value: item.name == 'N/A' ? 'queso' : item.id }))}
        options={list_devs}
        onChange={handleSelectChange}
      />
    </div>
  )
}
