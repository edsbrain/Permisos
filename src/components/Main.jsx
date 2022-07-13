import React from 'react'
import { Link } from 'react-router-dom'
import Persons from './Persons'


function Main() {
  return (
    <div>
        <Link to="/createPerson">
        <button type="button" className="btn btn-success m-3">
          Agregar Trabajador
        </button>
      </Link>
      <Persons/>

    </div>
  )
}

export default Main